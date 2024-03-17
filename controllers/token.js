const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user, expire) => {
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expire });
}

const defaultAuthenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    const accessToken = process.env.ACCESS_TOKEN_SECRET;
    if (accessToken) {
        jwt.verify(token, accessToken, (err, decodedToken) => {
            if (err) return res.sendStatus(401);
            else if (decodedToken.role !== "default") return res.sendStatus(401);
            else next();
        })
    } else return res.sendStats(401);
}

const adminAuthenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    const accessToken = process.env.ACCESS_TOKEN_SECRET;
    if (accessToken) {
        jwt.verify(token, accessToken, (err, decodedToken) => {
            if (err) return res.sendStatus(401);
            else if (decodedToken.role !== "admin") return res.sendStatus(401);
            else next();
        })
    } else return res.sendStatus(401);
}

module.exports = {generateAccessToken, defaultAuthenticateToken, adminAuthenticateToken};