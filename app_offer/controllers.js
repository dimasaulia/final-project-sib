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
                product: {
                    include: {
                        user: true,
                    },
                },
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

// Incoming offers
// barang kita yang di tawar orang lainn
module.exports.incomingOffers = async (req, res) => {
    try {
        const incomingOffers = await prisma.bid.findMany({
            where: {
                product: {
                    every: {
                        userId: getUser(req),
                    },
                },
            },
            include: {
                bidder: true,
                product: true,
            },
        });
        return resSuccess({
            res,
            title: "Your Incomig Offers",
            data: incomingOffers,
        });
    } catch (error) {
        return resError({
            res,
            title: "Something wrong",
            errors: error,
        });
    }
};

// Accapet incominng offers
module.exports.accepteOffer = async (req, res) => {
    try {
        const product = req.params.id;
        const offer = await prisma.bid.update({
            where: {
                id: Number(product),
            },
            data: {
                status: "Diterima",
            },
            include: {
                product: true,
            },
        });

        // console.log(offer.product[0].id);
        const otherOffer = await prisma.bid.updateMany({
            where: {
                id: {
                    not: offer.id,
                },
                product: {
                    every: {
                        id: offer.product[0].id,
                    },
                },
            },
            data: {
                status: "Ditolak",
            },
        });
        console.log("-", otherOffer);
        return resSuccess({ res, title: "Success accapte offer", data: offer });
    } catch (error) {
        return resError({
            res,
            title: "Something wrong",
            errors: error,
        });
    }
};

// Rejects Offer
module.exports.rejectOffer = async (req, res) => {
    try {
        const product = req.params.id;
        const offer = await prisma.bid.update({
            where: {
                id: Number(product),
            },
            data: {
                status: "Ditolak",
            },
        });
        return resSuccess({ res, title: "Success reject offer", data: offer });
    } catch (error) {
        return resError({
            res,
            title: "Something wrong",
            errors: error,
        });
    }
};
