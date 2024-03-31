const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user, expire) => {
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expire });
}

module.exports = {generateAccessToken};