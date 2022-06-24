const resError = ({ res, title, errors, code = 400 }) => {
    return res.status(code).json({
        success: false,
        message: title,
        data: {
            errors,
        },
    });
};

module.exports = { resError };
