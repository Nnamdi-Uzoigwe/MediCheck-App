// const mongoose = require("mongoose");

// const symptomSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   symptoms: [String], // e.g. ["fever", "cough", "fatigue"]
//   painScale: { type: Number, min: 1, max: 10 },
//   emergencySymptoms: [String], // e.g. ["chest pain", "shortness of breath"]
//   lifestyle: {
//     smokingStatus: { type: String, enum: ["never", "former", "current"] },
//     alcoholUse: { type: String, enum: ["never", "occasionally", "regularly"] }
//   },
//   extendedHistory: {
//     familyMedicalHistory: String,
//     medications: String
//   },
//   notes: String,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Symptom", symptomSchema);


const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // Core Symptoms Section
  coreSymptoms: {
    symptoms: [String], // e.g. ["fever", "headache", "fatigue"]
    otherSymptoms: String,
    severity: { 
      type: String, 
      enum: ["Mild", "Moderate", "Severe"],
      required: true 
    },
    duration: Number, // days
    painScale: { type: Number, min: 1, max: 10 },
    emergencySymptoms: [String], // e.g. ["chest pain", "severe shortness of breath"]
    symptomProgression: { 
      type: String, 
      enum: ["Getting worse", "Staying same", "Getting better"] 
    },
    triggeringFactors: String
  },

  // Medical History Section
  medicalHistory: {
    existingIllnesses: [String], // e.g. ["Diabetes", "Hypertension"]
    otherIllnesses: String,
    allergies: String,
    age: { type: Number, required: true, min: 0, max: 150 },
    gender: { 
      type: String, 
      enum: ["Male", "Female", "Other"],
      required: true 
    },
    weight: Number, // kg
    height: Number, // cm
    previousSurgeries: String,
    lastDoctorVisit: String
  },

  // Supporting Factors Section
  supportingFactors: {
    smokingStatus: { 
      type: String, 
      enum: ["Never", "Former", "Current"],
      default: "Never"
    },
    alcoholUse: { 
      type: String, 
      enum: ["Never", "Occasionally", "Regularly"],
      default: "Never"
    },
    exerciseLevel: { 
      type: String, 
      enum: ["Sedentary", "Light", "Moderate", "High"],
      default: "Moderate"
    },
    dietQuality: { 
      type: String, 
      enum: ["Poor", "Fair", "Good", "Excellent"],
      default: "Fair"
    },
    sleepHours: { type: Number, min: 0, max: 24 },
    stressLevel: { type: Number, min: 1, max: 10 },
    familyHistory: String,
    medications: String,
    notes: String
  },

  // Analysis Results (store AI response)
  analysisResults: {
    fullAnalysis: String, // Complete AI response
    urgencyLevel: { 
      type: String, 
      enum: ["ROUTINE", "URGENT", "EMERGENCY"],
      default: "ROUTINE"
    },
    riskFactors: [String],
    bmi: Number, // calculated BMI
    isEmergency: { type: Boolean, default: false },
    possibleConditions: [String], // extracted from AI response
    recommendations: String,
    disclaimer: String,
    analysisDate: { type: Date, default: Date.now }
  },

  // Metadata
  status: { 
    type: String, 
    enum: ["pending", "analyzed", "reviewed"],
    default: "pending"
  },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if reviewed by doctor
  reviewNotes: String,
  followUpRequired: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for better query performance
symptomSchema.index({ userId: 1, createdAt: -1 });
symptomSchema.index({ "analysisResults.urgencyLevel": 1 });
symptomSchema.index({ "analysisResults.isEmergency": 1 });
symptomSchema.index({ status: 1 });

// Virtual for calculated BMI
symptomSchema.virtual('calculatedBMI').get(function() {
  if (this.medicalHistory.weight && this.medicalHistory.height) {
    const heightInMeters = this.medicalHistory.height / 100;
    return (this.medicalHistory.weight / (heightInMeters * heightInMeters)).toFixed(1);
  }
  return null;
});

// Pre-save middleware to update timestamps and calculate BMI
symptomSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Calculate and store BMI if height and weight are available
  if (this.medicalHistory.weight && this.medicalHistory.height && !this.analysisResults.bmi) {
    const heightInMeters = this.medicalHistory.height / 100;
    this.analysisResults.bmi = (this.medicalHistory.weight / (heightInMeters * heightInMeters));
  }
  
  next();
});

// Instance methods
symptomSchema.methods.markAsEmergency = function() {
  this.analysisResults.isEmergency = true;
  this.analysisResults.urgencyLevel = "EMERGENCY";
  this.status = "analyzed";
  return this.save();
};

symptomSchema.methods.addAnalysisResults = function(analysisData) {
  this.analysisResults = {
    ...this.analysisResults,
    ...analysisData,
    analysisDate: new Date()
  };
  this.status = "analyzed";
  return this.save();
};

// Static methods
symptomSchema.statics.findByUrgencyLevel = function(urgencyLevel) {
  return this.find({ "analysisResults.urgencyLevel": urgencyLevel });
};

symptomSchema.statics.findEmergencyCases = function() {
  return this.find({ "analysisResults.isEmergency": true })
             .sort({ createdAt: -1 });
};

symptomSchema.statics.getUserSymptomHistory = function(userId, limit = 10) {
  return this.find({ userId })
             .sort({ createdAt: -1 })
             .limit(limit);
};

module.exports = mongoose.model("Symptom", symptomSchema);