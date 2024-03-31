const express = require("express");
const router = express.Router();
const {fetchUsers, registerUser, loginUser, updateUser, deleteUser} = require("../controllers/UserController");
const {adminAuthenticateToken} = require("../controllers/TokenController");

router.route("/fetch").get(adminAuthenticateToken, fetchUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update-id/:id").put(adminAuthenticateToken, updateUser);
router.route("/delete-id/:id").delete(adminAuthenticateToken, deleteUser);
router.route("/update-email/:email").put(adminAuthenticateToken, updateUser);
router.route("/delete-email/:email").delete(adminAuthenticateToken, deleteUser);

module.exports = router;