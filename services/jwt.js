require("dotenv").config();
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60; // 3 days

const expTime = () => {
    return maxAge;
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: process.env.MAX_AGE || expTime(),
    });
};

module.exports = { createToken, expTime };
