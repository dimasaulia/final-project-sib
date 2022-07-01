const { PrismaClient } = require("@prisma/client");
const { resError } = require("../services/responseHandler");
const { getUser } = require("../services/auth");
const prisma = new PrismaClient();

const isOfferExist = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const product = await prisma.bid.findUnique({
            where: {
                id: Number(productId),
            },
        });
        if (!product) throw "Offer not exist";
        return next();
    } catch (error) {
        return resError({
            res,
            title: "Cant find Offer",
            errors: error,
        });
    }
};

const isUserOffer = async (req, res, next) => {
    const productId = req.params.id;
    const userId = getUser(req);
    try {
        const product = await prisma.bid.findUnique({
            where: {
                id: Number(productId),
            },
            include: {
                bidder: {
                    where: {
                        id: userId,
                    },
                },
            },
        });
        if (product.bidder) throw "This is not your offer";
        return next();
    } catch (error) {
        console.log(error);
        return resError({
            res,
            title: "You can't perform this action",
            errors: error,
        });
    }
};

const isNotUserOffer = async (req, res, next) => {
    const productId = req.params.id;
    const userId = getUser(req);
    try {
        const product = await prisma.bid.findUnique({
            where: {
                id: Number(productId),
            },
            include: {
                bidder: {
                    where: {
                        id: userId,
                    },
                },
            },
        });
        if (product.bidder) throw "This your own offer";
        return next();
    } catch (error) {
        return resError({
            res,
            title: "You can't perform this action",
            errors: error,
        });
    }
};

module.exports = { isOfferExist, isUserOffer, isNotUserOffer };
