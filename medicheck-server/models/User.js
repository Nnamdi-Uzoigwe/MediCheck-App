const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 6
  }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
