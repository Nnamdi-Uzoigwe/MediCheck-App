// const mongoose = require("mongoose");

// const diagnosisSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   symptomId: { type: mongoose.Schema.Types.ObjectId, ref: "Symptom" },
//   diagnosisText: String, // AI result summary
//   recommendedActions: [String],
//   severity: { type: String, enum: ["mild", "moderate", "severe"] },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Diagnosis", diagnosisSchema);



const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  symptoms: {
    coreSymptoms: Object,
    medicalHistory: Object,
    supportingFactors: Object
  },
  analysis: {
    fullAnalysis: String,
    urgencyLevel: {
      type: String,
      enum: ["ROUTINE", "URGENT", "EMERGENCY"]
    },
    riskFactors: [String],
    patientData: Object,
    disclaimer: String
  },
  status: {
    type: String,
    enum: ["processing", "completed", "failed"],
    default: "processing"
  },
  error: String
}, { 
  timestamps: true 
});

// Auto-delete old records after 30 days
diagnosisSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model("Diagnosis", diagnosisSchema);