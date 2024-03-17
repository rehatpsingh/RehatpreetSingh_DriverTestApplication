const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    dob: { type: Date },
    username: { type: String, unique: true },
    password: { type: String }, 
    userType: { type: String },
    licenseNumber: { type: String, unique: true },
    carDetails: {
        make: { type: String },
        model: { type: String },
        year: { type: Number },
        plateNo: { type: String } 
    }
});

// Hash password and license number before saving
userSchema.pre('save', async function(next) {
    // Hash password if modified and not empty
    if (this.isModified('password') && this.password) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        } catch (error) {
            return next(error);
        }
    }

    // Hash license number if modified and not empty
    if (this.isModified('licenseNumber') && this.licenseNumber) {
        try {
            const hashedLicenseNumber = await bcrypt.hash(this.licenseNumber, 10);
            this.licenseNumber = hashedLicenseNumber;
        } catch (error) {
            return next(error);
        }
    }
    return next();
});

// User model
const User = mongoose.model('User', userSchema);
module.exports = User;
