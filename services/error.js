const resError = (res, title, errors) => {
    return res.status(400).json({
        success: false,
        message: title,
        data: {
            errors,
        },
    });
};

module.exports = { resError };
