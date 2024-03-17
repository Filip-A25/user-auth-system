const express = require("express");
const app = express();
const users = require("./routes/users");
const cookieParser = require("cookie-parser");
const {defaultAuthenticateToken, adminAuthenticateToken} = require("./controllers/token");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

// Set the base of the route "users" routes will use.
app.use("/users", users);

app.get("/default", defaultAuthenticateToken, (req, res) => res.sendStatus(200));
app.get("/admin", adminAuthenticateToken, (req, res) => res.sendStatus(200));

// Set up a server.
const server = app.listen(4000, () => {
    console.log("Listening on port 4000...");
})

process.on("unhandledRejection", (err) => {
    console.log(err.message);
    server.close(() => process.exit(1));
})