const mongoose = require("mongoose");

// const hospitalSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   address: String,
//   location: {
//     lat: Number,
//     lng: Number
//   },
//   contactNumber: String,
//   services: [String]
// });

// module.exports = mongoose.model("Hospital", hospitalSchema);


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