const Appointment = require('../models/appointment');

// Show appointment page
exports.showAppointmentPage = (req, res) => {
    const userLoggedIn = req.session.userLoggedIn || false;
    const userType = req.session.userType || ''; 
    res.render('appointment', { userLoggedIn, userType, message: null });
};

// Add appointment slot
exports.addAppointmentSlot = async (req, res) => {
    const { date, timeslot } = req.body;
    try {
        const existingSlot = await Appointment.findOne({ date, time: timeslot });
        if (existingSlot) {
            res.render('appointment', { message: { type: 'error', text: 'Slot exists already! Please change date or time.' }, userLoggedIn: true, userType: 'Admin' });
        } else {
            // Create a new appointment slot with isTimeSlotAvailable set to true
            await Appointment.create({ date, time: timeslot, isTimeSlotAvailable: true });
            res.render('appointment', { message: { type: 'success', text: 'Slot added successfully!' }, userLoggedIn: true, userType: 'Admin' });
        }
    } catch (error) {
        console.error('Error adding appointment slot:', error);
        res.status(500).send('Error adding appointment slot');
    }
};

