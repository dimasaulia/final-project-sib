const { PrismaClient } = require("@prisma/client");
const { resError } = require("../services/responseHandler");
const { getUser } = require("../services/auth");
const prisma = new PrismaClient();

const isExist = async (req, res, next) => {
    const productId = req.params.id || req.body.id || req.querys.id;
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(productId),
            },
        });
        if (!product) throw "Product not exist";
        return next();
    } catch (error) {
        return resError({
            res,
            title: "Cant find product",
            errors: error,
        });
    }
};

const isUserProduct = async (req, res, next) => {
    const productId = req.params.id;
    const userId = getUser(req);
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(productId),
            },
            select: {
                userId: true,
            },
        });
        // console.log(product, userId, product !== userId);
        if (product.userId !== userId) throw "This is not your product";
        return next();
    } catch (error) {
        return resError({
            res,
            title: "You can't perform this action",
            errors: error,
        });
    }
};

const isNotUserProduct = async (req, res, next) => {
    const productId = req.params.id;
    const userId = getUser(req);
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(productId),
            },
            select: {
                userId: true,
            },
        });
        if (product.userId === userId)
            throw "This is your product, you cant bid your own products";
        return next();
    } catch (error) {
        return resError({
            res,
            title: "You can't perform this action",
            errors: error,
        });
    }
};

module.exports = { isExist, isUserProduct, isNotUserProduct };
