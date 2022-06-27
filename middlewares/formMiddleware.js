const { validationResult } = require("express-validator");
const { resError } = require("../services/responseHandler");

const formChacker = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    if (!errors.isEmpty()) {
        return resError({
            res,
            title: "From Error",
            errors: errors.errors,
            code: 400,
        });
    }
};

module.exports = { formChacker };
