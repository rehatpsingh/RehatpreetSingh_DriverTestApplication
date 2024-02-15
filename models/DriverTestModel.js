const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  licenseNumber: { type: String, required: true },
  carDetails: {
    make: { type: String },
    model: { type: String },
    year: { type: String },
    platno: { type: String }
  }
});

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
