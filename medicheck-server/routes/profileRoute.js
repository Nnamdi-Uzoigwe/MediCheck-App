const express = require("express");
const { createProfile, getProfile, updateProfile } = require("../controllers/profileController.js");

const router = express.Router();

// Create profile
router.post("/", createProfile);

// Get profile by ID
router.get("/:id", getProfile);

// Update profile by ID
router.put("/:id", updateProfile);

module.exports  = router;
