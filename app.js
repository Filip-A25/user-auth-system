const express = require("express");
const app = express();
const users = require("./routes/users");

app.use(express.static("./public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Set the base of the route "users" routes will use.
app.use("/users", users);

// Set up a server.
const server = app.listen(4000, () => {
    console.log("Listening on port 4000...");
})

process.on("unhandledRejection", (err) => {
    console.log(err.message);
    server.close(() => process.exit(1));
})