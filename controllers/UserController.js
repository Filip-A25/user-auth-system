const {authenticateConnection} = require("../config/Database");
const argon2 = require("argon2");
require("dotenv").config();
const {checkEmailFormat, checkUsernameFormat} = require("../services/UserService");
const {generateAccessToken} = require("./TokenController");
const {User, sequelize} = require("../models/UserModel");

const fetchUsers = async (req, res) => {    
    try {
        await authenticateConnection(sequelize);
    
        const queryResult = await User.findAll();

        if (!queryResult) return res.status(404).json({success: false, message: "Users could not be found."});
        res.status(200).json({success: true, data: queryResult});
    } catch (err) {
        res.sendStatus(500);
    }
}

const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    const trimEmail = email.replace(/\s/g, "");
    const trimUsername = username.replace(/\s/g, "");
    
    if (!checkEmailFormat(trimEmail) || !checkUsernameFormat(trimUsername) || !password) return res.status(400).json({success: false, message: "Invalid input."});
    
    const hash = await argon2.hash(password);

    try {
        await authenticateConnection(sequelize);

        const user = new User();
        const queryResult = await user.createUser(trimEmail, trimUsername, hash);
        
        if (!queryResult) return res.status(401).json({success: false, message: "User could not be registered"});
        res.status(201).json({success: true, message: "User successfully registered."});
    } catch (err) {
        res.sendStatus(500);
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const trimEmail = email.replace(/\s/g, "");

    if (!checkEmailFormat(trimEmail) || !password) return res.status(400).json({success: false, message: "Invalid input."});

    try {
        await authenticateConnection(sequelize);

        const user = await User.findAll({
            where: {
                email: trimEmail
            }
        });
        const authResult = await argon2.verify(user.dataValues.password , password);

        if (!authResult) return res.status(401).json({success: false, message: "Incorrect password entered."});
        if (authResult) {
            const expiryTime = 3 * 3600 * 1000;
            const accessToken = generateAccessToken(user, expiryTime);

            res.cookie("jwt", accessToken, {httpOnly: true, maxAge: expiryTime});
            res.status(201).json({success: true, message: "User successfully logged in."});
        }
    } catch (err) {
        res.sendStatus(500);
    }
}

const updateUser = async (req, res) => {
    const {id, email} = req.params;
    const {role} = req.body;

    if (!id && !email || !role) return res.status(404).json({success: false, message: "User ID or E-mail is required."});

    try {
        await authenticateConnection(sequelize);
    
        const fetchResult = id ? await User.findAll({
            attributes: ["role"],
            where: {
                id: Number(id)
            }
        }) : await User.findAll({
            attributes: ["role"],
            where: {
                email: email
            }
        });

        console.log(fetchResult);
        if (fetchResult === role) return res.status(401).json({success: false, message: `User already has ${role} role.`});

        const user = new User();
        const queryResult = id ? await user.updateUserWithId(Number(id), {role: role}) : await user.updateUserWithEmail(email, {role: role});

        if (!queryResult) return res.status(401).json({success: false, message: "User's role could not be updated."});
        res.status(201).json({success: true, message: "User's role successfully updated."});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const deleteUser = async (req, res) => {
    const {id, email} = req.params;

    if (!id && !email) return res.status(404).json({success: false, message: "User ID or E-mail is required."});

    try {
        await authenticateConnection(sequelize);
    
        const user = new User();
        id ? await user.deleteUserWithId(Number(id)) : await user.deleteUserWithEmail(email);
    
        res.status(201).json({success: true, message: "User successfully deleted."});
    } catch (err) {
        res.sendStatus(500);
    }
}


module.exports = {fetchUsers, registerUser, loginUser, updateUser, deleteUser};