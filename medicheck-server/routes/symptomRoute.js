const express = require("express");
const router = express.Router();
const symptomController = require("../controllers/symptomController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, symptomController.submitSymptoms);
router.get("/history", authMiddleware, symptomController.getSymptomHistory);

module.exports = router;