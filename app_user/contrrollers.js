require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { resError } = require("../services/error");
const { createToken, expTime, getToken } = require("../services/jwt");
const prisma = new PrismaClient();
const saltRounds = 10;

module.exports.register = async (req, res) => {
    // check first if req have any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resError({ res, title: "Something wrong", errors });
    }

    const { username, password, email } = req.body;
    const hashPassword = bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(saltRounds)
    );

    try {
        // regsiter user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            },
        });

        // generete user profile
        const profile = await prisma.profil.create({
            data: {
                userId: user.id,
                full_name: username,
            },
            select: {
                full_name: true,
            },
        });

        const token = createToken(user.id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: expTime() * 1000 });
        res.status(200).send({
            success: true,
            message: "User register in successfully",
            data: {
                user,
                profile,
                token,
            },
        });
    } catch (error) {
        return resError({ res, title: "Can't create user", errors: error });
    }
};

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resError({
            res,
            title: "Something wrong",
            errors: errors.errors,
        });
    }

    const { username, password } = req.body;
    try {
        // try find the user
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
                username: true,
                password: true,
            },
        });

        // give response if cant find the user
        if (user === null) throw "Username not match";

        // compare user and password
        const auth = await bcrypt.compare(password, user.password);

        // give response if password not match
        if (!auth) throw "Username and password didn't match";

        // set the cookies
        const token = createToken(user.id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: expTime() * 1000 });

        return res.status(200).send({
            success: true,
            message: "User successfully log in",
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        return resError({ res, title: "Can't logging in user", errors: error });
    }
};

module.exports.changePassword = async (req, res) => {
    // check first if req have any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resError({
            res,
            title: "Something wrong",
            errors: errors.error,
        });
    }

    try {
        const token = getToken(req);
        const uuid = jwt.verify(
            token,
            process.env.SECRET,
            (err, decode) => decode.id
        );
        //---------------------------------------

        const { oldPassword, newPassword } = req.body;
        const hashPassword = bcrypt.hashSync(
            newPassword,
            bcrypt.genSaltSync(saltRounds)
        );

        // find user
        const user = await prisma.user.findUnique({
            where: {
                id: uuid,
            },
            select: {
                id: true,
                password: true,
            },
        });

        if (user === null) throw "Cant find user";

        // compare the old password
        const compare = bcrypt.compareSync(oldPassword, user.password);
        if (!compare) throw "Old password not match";

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashPassword,
            },
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
            },
        });

        return res.status(200).send({
            success: true,
            message: "Succsesfully change your password",
            data: {
                updatedUser,
            },
        });
    } catch (error) {
        return resError({
            res,
            title: "Cant change user password",
            errors: error,
        });
    }
};

module.exports.logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).send({
        success: true,
        message: "Successfull log out",
        data: {},
    });
};
