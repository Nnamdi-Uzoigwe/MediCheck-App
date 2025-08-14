const express = require("express");
const router = express.Router();
const diagnosisController = require("../controllers/diagnosisController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id", authMiddleware, diagnosisController.getDiagnosis);
router.get("/", authMiddleware, diagnosisController.getDiagnoses);

module.exports = router;