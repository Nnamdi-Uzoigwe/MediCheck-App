const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  location: {
    lat: Number,
    lng: Number
  },
  contactNumber: String,
  services: [String]
});

module.exports = mongoose.model("Hospital", hospitalSchema);
