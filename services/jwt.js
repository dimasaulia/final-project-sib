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

const getToken = (req) => {
    return (
        (req.headers.jwt && req.headers.jwt.split(" ")[1]) || req.cookies.jwt
    );
};

const getUser = (req) => {
    const UUID = jwt.verify(
        getToken(req),
        process.env.SECRET,
        (err, decode) => {
            return decode.id;
        }
    );
};

module.exports = { createToken, expTime, getToken, getUser };
