const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symptomId: { type: mongoose.Schema.Types.ObjectId, ref: "Symptom" },
  diagnosisText: String, // AI result summary
  recommendedActions: [String],
  severity: { type: String, enum: ["mild", "moderate", "severe"] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
