if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config();
const jwt = require("jsonwebtoken");
const { resError } = require("../services/responseHandler");
const { getToken, getUser } = require("../services/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const loginRequired = (req, res, next) => {
    const token = getToken(req);

    // check if token exits
    if (!token)
        return resError({
            res,
            title: "Login Requires! Please Login",
            code: 403,
        });

    // verify token
    jwt.verify(token, process.env.SECRET, async (err, decode) => {
        if (!err) {
            const user = await prisma.user.findUnique({
                where: {
                    id: decode.id,
                },
                select: {
                    id: true,
                    username: true,
                },
            });
            if (user) return next();

            if (!user)
                return resError({
                    res,
                    title: "Cant find the user",
                    code: 403,
                });
        } else {
            return resError({
                res,
                title: "Token is not valid",
                code: 403,
            });
        }
    });
};

module.exports = { loginRequired };
