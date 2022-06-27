const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const { getUser } = require("../services/auth");
const { resError } = require("../services/responseHandler");
const prisma = new PrismaClient();

module.exports.create = async (req, res) => {
    const { name, description, porductPhoto, minimumPrice, categoryName } =
        req.body;

    const categoryList = [];

    categoryName.split(",").forEach((c) => {
        categoryList.push({ name: c.replace(" ", "") });
    });

    try {
        const product = await prisma.product.create({
            data: {
                userId: getUser(req),
                name,
                description,
                porductPhoto,
                minimumPrice: Number(minimumPrice),
                category: {
                    connect: categoryList,
                },
            },
        });

        return res.status(201).json({
            success: true,
            title: "Successefuly created product",
            data: product,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Failed create product",
            desc: "Failed to add new product",
            errors,
        });
    }
};

module.exports.allProducts = async (req, res) => {
    try {
        const userProduct = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                minimumPrice: true,
                createdAt: true,
                isPublished: true,
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        return res.status(201).json({
            success: true,
            title: "Successefuly listed product",
            data: userProduct,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Failed create product",
            desc: "Failed to add new product",
            errors,
        });
    }
};

module.exports.availableProducts = async (req, res) => {
    try {
        const userProduct = await prisma.product.findMany({
            where: {
                isPublished: true,
            },
            select: {
                id: true,
                name: true,
                description: true,
                minimumPrice: true,
                createdAt: true,
                isPublished: true,
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        return res.status(201).json({
            success: true,
            title: "Successefuly listed product",
            data: userProduct,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Failed create product",
            desc: "Failed to add new product",
            errors,
        });
    }
};

module.exports.detail = async (req, res) => {
    const productId = req.params.id;
    try {
        const detailProduct = await prisma.product.findUnique({
            where: {
                id: Number(productId),
            },
        });

        return res.status(200).json({
            success: true,
            title: "Successefuly get product detail",
            data: detailProduct,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Failed to get product details",
            errors,
        });
    }
};

module.exports.search = async (req, res) => {
    const searchQuery = req.query.name;
    try {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: searchQuery,
                    mode: "insensitive",
                },
            },
        });

        return res.status(200).json({
            success: true,
            title: "Successefuly get product detail",
            data: products,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Failed to get product details",
            errors,
        });
    }
};

// product by username
module.exports.userProducts = async (req, res) => {
    const username = req.params.username;
    try {
        const userProduct = await prisma.product.findMany({
            where: {
                user: {
                    username,
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                minimumPrice: true,
                createdAt: true,
                isPublished: true,
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        return res.status(201).json({
            success: true,
            title: "Successefuly listed product",
            data: userProduct,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Failed create product",
            desc: "Failed to add new product",
            errors,
        });
    }
};

// base on user logging in
module.exports.userAllProducts = async (req, res) => {
    try {
        const userProduct = await prisma.product.findMany({
            where: {
                userId: getUser(req),
            },
            select: {
                id: true,
                name: true,
                description: true,
                minimumPrice: true,
                createdAt: true,
                isPublished: true,
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        return res.status(201).json({
            success: true,
            title: "Successefuly listed product",
            data: userProduct,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Failed create product",
            desc: "Failed to add new product",
            errors,
        });
    }
};

module.exports.deleteOne = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: Number(productId),
            },
        });

        return res.status(200).json({
            success: true,
            title: "Successefuly deleted product",
            data: deletedProduct,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Failed delete product",
            desc: "Failed to add new product",
            errors,
        });
    }
};

module.exports.update = async (req, res) => {
    const productId = req.params.id;
    const { name, description, porductPhoto, minimumPrice, categoryName } =
        req.body;

    const categoryList = [];
    if (categoryName) {
        categoryName.split(",").forEach((c) => {
            categoryList.push({ name: c.replace(" ", "") });
        });
    }

    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: Number(productId),
            },
            data: {
                name,
                description,
                porductPhoto,
                minimumPrice: Number(minimumPrice),
                category: {
                    set: categoryList,
                },
            },
        });

        return res.status(200).json({
            success: true,
            title: "Successefuly update the product",
            data: updatedProduct,
        });
    } catch (errors) {
        console.log(errors);
        return resError({
            res,
            title: "Failed update product",
            desc: "Failed to add new product",
            errors,
        });
    }
};
