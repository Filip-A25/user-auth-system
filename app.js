const express = require("express");
const app = express();
const users = require("./routes/UserRoutes");
const cookieParser = require("cookie-parser");
const {defaultAuthenticateToken, adminAuthenticateToken} = require("./controllers/TokenController");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use("/users", users);

app.get("/default", defaultAuthenticateToken, (req, res) => res.sendStatus(200));
app.get("/admin", adminAuthenticateToken, (req, res) => res.sendStatus(200));

const server = app.listen(5000, () => {
    console.log("Listening on port 5000...");
})

process.on("unhandledRejection", (err) => {
    console.log(err.message);
    server.close(() => process.exit(1));
})