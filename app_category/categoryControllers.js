const { PrismaClient } = require("@prisma/client");
const { resError, resSuccess } = require("../services/responseHandler");
const prisma = new PrismaClient();

module.exports.create = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const category = await prisma.category.create({
            data: {
                name: categoryName.toLowerCase(),
            },
        });
        return resSuccess({
            res,
            title: "Success create a category",
            data: category,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Something wrong",
            errors,
        });
    }
};

module.exports.list = async (req, res) => {
    try {
        const categoryList = await prisma.category.findMany({});
        return resSuccess({
            res,
            title: "Success get all categorys",
            data: categoryList,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Something wrong",
            errors,
        });
    }
};

module.exports.delete = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const deletedCategory = await prisma.category.delete({
            where: {
                name: categoryName,
            },
        });
        return resSuccess({
            res,
            title: "Success delete categorys",
            data: deletedCategory,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Something wrong",
            errors,
        });
    }
};

module.exports.productBaseOnCategory = async (req, res) => {
    try {
        const productName = req.params.categoryName;
        const products = await prisma.category.findMany({
            where: {
                name: productName,
            },
            include: {
                product: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        porductPhoto: true,
                        minimumPrice: true,
                    },
                },
            },
        });
        return resSuccess({
            res,
            title: "Product base on category",
            data: products,
        });
    } catch (errors) {
        return resError({
            res,
            title: "Something wrong",
            errors,
        });
    }
};
