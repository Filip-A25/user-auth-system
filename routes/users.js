const express = require("express");
const router = express.Router();
const {fetchUsers, registerUser, loginUser, updateUser, deleteUser} = require("../controllers/user");

// Set up routes for HTTP requests.
router.route("/fetch").get(fetchUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update/:id").put(updateUser).delete(deleteUser);
router.route("/update/:email").put(updateUser).delete(deleteUser);

module.exports = router;