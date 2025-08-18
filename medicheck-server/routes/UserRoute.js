const express = require("express");
const { registerUser, loginUser, verifyUser } = require("../controllers/UserController.js");

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

router.get("/verify", verifyUser);

module.exports = router;
