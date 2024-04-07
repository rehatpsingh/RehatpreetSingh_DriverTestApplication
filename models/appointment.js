const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    testType: { type: String, required: true },
    isTimeSlotAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('appointment', appointmentSchema);
