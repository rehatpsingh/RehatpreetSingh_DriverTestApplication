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
    licenseNumber: { type: String },
    carDetails: {
        make: { type: String },
        model: { type: String },
        year: { type: Number },
        plateNo: { type: String } 
    },
    appointment: {
        g2date: { type: Date },
        g2time: { type: String },
        gdate: { type: Date },
        gtime: { type: String }
    },
    // New fields for Examiner's features
    testType: { type: String }, 
    comment: { type: String }, 
    passOrFail: { type: String } 
});

// Hash password and license number before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password') && this.password) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        } catch (error) {
            return next(error);
        }
    }

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
