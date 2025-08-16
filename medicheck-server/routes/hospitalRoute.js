const express = require("express");
const router = express.Router();
const { saveHospital, getSavedHospitals } = require("../controllers/hospitalController");

// POST: Save selected hospital
router.post("/", saveHospital);
router.get("/:userId", getSavedHospitals);

module.exports = router;
