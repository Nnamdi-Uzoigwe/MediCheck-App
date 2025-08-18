const mongoose = require("mongoose");

const SavedHospitalSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String 
  },
  distanceKm: { 
    type: Number 
  },
  savedAt: { 
    type: Date, 
    default: Date.now 
  },
});

const SavedHospital = mongoose.model('SavedHospital', SavedHospitalSchema);

module.exports = SavedHospital;