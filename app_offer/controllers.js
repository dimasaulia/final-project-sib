const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const { getUser } = require("../services/auth");
const { resError, resSuccess } = require("../services/responseHandler");
const prisma = new PrismaClient();

module.exports.create = async (req, res) => {
    try {
        const user = getUser(req);
        const product = req.params.id;
        const { offerPrice: offer_price } = req.body;

        const offer = await prisma.bid.create({
            data: {
                offer_price: Number(offer_price),
                bidder: {
                    connect: {
                        id: user,
                    },
                },
                product: {
                    connect: {
                        id: Number(product),
                    },
                },
            },
        });

        return resSuccess({
            res,
            title: "Success create offer",
            code: 201,
            data: offer,
        });
    } catch (error) {
        return resError({
            res,
            title: "Something wrong",
            errors: error,
        });
    }
};

// Daftar barang yang di tawar oleh si user
module.exports.userOffers = async (req, res) => {
    try {
        const user = getUser(req);

        const offer = await prisma.bid.findMany({
            where: {
                bidder: {
                    every: {
                        id: user,
                    },
                },
            },
            include: {
                product: true,
            },
        });

        return resSuccess({
            res,
            title: "Success lists yout offer",
            code: 200,
            data: offer,
        });
    } catch (error) {
        return resError({
            res,
            title: "Something wrong",
            errors: error,
        });
    }
};

// delete offer
module.exports.deletOffers = async (req, res) => {
    try {
        const product = req.params.id;
        const deletedOffer = await prisma.bid.delete({
            where: {
                id: Number(product),
            },
        });
        resSuccess({
            res,
            title: "Success delete yout offer",
            code: 200,
            data: deletedOffer,
        });
    } catch (error) {
        return resError({
            res,
            title: "Something wrong",
            errors: error,
        });
    }
};
