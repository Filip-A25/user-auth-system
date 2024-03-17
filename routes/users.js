const express = require("express");
const router = express.Router();
const {fetchUsers, registerUser, loginUser, updateUser, deleteUser} = require("../controllers/user");
const {adminAuthenticateToken} = require("../controllers/token");

// Set up routes for HTTP requests.
router.route("/fetch").get(adminAuthenticateToken, fetchUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update/:id").put(adminAuthenticateToken, updateUser);
router.route("/delete/:id").delete(adminAuthenticateToken, deleteUser);
router.route("/update/:email").put(adminAuthenticateToken, updateUser);
router.route("/delete/:email").delete(adminAuthenticateToken, deleteUser);

module.exports = router;