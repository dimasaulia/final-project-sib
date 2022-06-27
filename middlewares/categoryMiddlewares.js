const { PrismaClient } = require("@prisma/client");
const { resError } = require("../services/responseHandler");
const prisma = new PrismaClient();

const categoryIsNotExist = async (req, res, next) => {
    const { categoryName } = req.body;
    try {
        const category = await prisma.category.findUnique({
            where: {
                name: categoryName,
            },
        });
        if (category) throw "Cant create category, Category already exist";
        return next();
    } catch (error) {
        return resError({
            res,
            title: "Category has been created",
            errors: error,
        });
    }
};

const categoryIsExist = async (req, res, next) => {
    const categoryName = req.body.categoryName || req.params.categoryName;
    try {
        const category = await prisma.category.findUnique({
            where: {
                name: categoryName,
            },
        });
        if (!category) throw "Cant find category";
        return next();
    } catch (error) {
        return resError({
            res,
            title: "Category cant be deleted",
            errors: error,
        });
    }
};

module.exports = { categoryIsNotExist, categoryIsExist };
