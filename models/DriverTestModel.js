const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    dob: { type: Date },
    username: { type: String, unique: true },
    password: { type: String }, // Removed set option for password
    userType: { type: String },
    licenseNumber: { type: String, unique: true }, // Removed set option for licenseNumber
    carDetails: {
        make: { type: String },
        model: { type: String },
        year: { type: Number },
        plateNo: { type: String }
    }
});

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
