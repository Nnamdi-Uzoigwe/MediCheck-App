const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  diagnosisId: { type: mongoose.Schema.Types.ObjectId, ref: "Diagnosis" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Record", recordSchema);
