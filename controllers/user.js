const {connection, connectDb, endDbConnection} = require("../db/database");
const { Client } = require("pg");
const argon2 = require("argon2");
const {checkEmailFormat, checkUsernameFormat} = require("./format");

const fetchUsers = async (req, res, next) => {
    // Enter query for PostgreSQL database.
    const query = "SELECT * FROM public.user";
    const db = new Client(connection);

    // Connect to a database.
    await connectDb(db);

    // Run query in the database.
    const queryResult = await db.query(query);

    // End connection with database.
    await endDbConnection(db);

    res.status(200).json({success: true, data: queryResult.rows});
}

const registerUser = async (req, res, next) => {
    const { email, username, password } = req.body;
    const trimEmail = email.replace(/\s/g, "");
    const trimUsername = username.replace(/\s/g, "");
    
    // Check email and username format, check if password is entered.
    if (!checkEmailFormat(trimEmail) || !checkUsernameFormat(trimUsername) || !password) return res.status(400).json({success: false, message: "Invalid input."});
    
    // Hash entered password.
    const hash = await argon2.hash(password);
    const query = {
        text: "INSERT INTO public.user (email, username, password, role) VALUES ($1, $2, $3, $4)",
        values: [trimEmail, trimUsername, hash, "default"]
    }
    const db = new Client(connection);

    await connectDb(db);

    await db.query(query);

    await endDbConnection(db);

    res.status(201).json({success: true, message: `User with email ${trimEmail} and username ${trimUsername} created`});
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const trimEmail = email.replace(/\s/g, "");

    if (!checkEmailFormat(trimEmail) || !password) return res.status(400).json({success: false, message: "Invalid input."});

    const query = {
        text: "SELECT * FROM public.user WHERE email = $1",
        values: [trimEmail]
    }
    const db = new Client(connection);

    await connectDb(db);

    const queryResult = await db.query(query);
    // Verify entered password to authenticate user.
    const authResult = await argon2.verify(queryResult.rows[0].password, password);

    await endDbConnection(db);

    // Check if authResult return 'true' or 'false'.
    if (!authResult) return res.status(401).json({success: false, message: "Wrong password entered."});
    res.status(201).json({success: true, message: "User successfully logged in."})
}

const updateUser = async (req, res, next) => {
    const {id, email} = req.params;

    if (!id && !email) return res.status(404).json({success: false, message: "User ID or E-mail is required."});
    const fetchQuery = id ? {
        text: "SELECT * FROM public.user WHERE id = $1",
        values: [id]
    } : {
        text: "SELECT * FROM public.user WHERE email = $1",
        values: [email]
    }
    const db = new Client(connection);

    await connectDb(db);
    const queryResult = await db.query(fetchQuery, (err, result) => {
        if (err) return res.status(400).json({success: false, message: err});
    });
    await endDbConnection(db);

    if (queryResult.rows[0].role === "admin") return res.status(400).json({success: false, message: "User already has admin role."});

    const updateQuery = id ? {
        text: "UPDATE public.user SET role = admin WHERE id = $1",
        values: [id]
    } : {
        text: "UPDATE public.user SET role = admin WHERE email = $1",
        values: [email]
    }

    await connectDb(db);
    await db.query(updateQuery, (err, result) => {
        if (err) return res.status(400).json({success: false, message: err});
    });
    await endDbConnection(db);

    res.status(201).json({success: true, message: "Users role was successfully set to admin."});
}

const deleteUser = async (req, res, next) => {
    const {id, email} = req.params;

    if (!id && !email) return res.status(404).json({success: false, message: "User ID or E-mail is required."});
    const query = id ? {
        text: "DELETE FROM public.user WHERE id = $1",
        values: [id]
    } : {
        text: "DELETE FROM public.user WHERE email = $1",
        values: [email]
    }

    const db = new Client(connection);

    await connectDb(db);

    await db.query(query);
    
    await endDbConnection(db);

    res.status(201).json({success: true, message: "User successfully deleted."});
}


module.exports = {fetchUsers, registerUser, loginUser, updateUser, deleteUser};