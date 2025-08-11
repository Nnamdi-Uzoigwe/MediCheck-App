const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symptoms: [String], // e.g. ["fever", "cough", "fatigue"]
  painScale: { type: Number, min: 1, max: 10 },
  emergencySymptoms: [String], // e.g. ["chest pain", "shortness of breath"]
  lifestyle: {
    smokingStatus: { type: String, enum: ["never", "former", "current"] },
    alcoholUse: { type: String, enum: ["never", "occasionally", "regularly"] }
  },
  extendedHistory: {
    familyMedicalHistory: String,
    medications: String
  },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Symptom", symptomSchema);
