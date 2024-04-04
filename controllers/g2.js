const User = require('../models/DriverTestModel');
const Appointment = require('../models/appointment');
const { format } = require('date-fns-tz');

// Function to render G2 page
exports.renderG2Page = async (req, res) => {
    if (!req.session.userLoggedIn) {
        // If not logged in, redirect to login page
        res.redirect('/Login');
    } else {
        try {
            // Fetch user details from the database based on the username in the session
            const user = await User.findOne({ username: req.session.username });

            if (!user) {
                // If user is not found, handle the error or redirect to an appropriate page
                res.status(404).send('User not found');
            } else {
                // Get current date in UTC
                const currentDate = new Date();
                const currDate = format(currentDate, 'yyyy-MM-dd', { timeZone: 'Etc/UTC' }).toString().split('T')[0];
                const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Etc/UTC' });
                const dateParts = formattedDate.split(' ')[0]; // Get only the date part
                const convertedDate = dateParts + "T00:00:00.000+00:00";

                // Fetch available appointment slots for the current date
                const availableSlots = await Appointment.find({ date: convertedDate, isTimeSlotAvailable: true });

                // Determine if the user has an appointment (consider both date and time)
                const userHasAppointment = user.appointment && user.appointment.date && user.appointment.time;

                // If user has an appointment, fetch appointment date and time from user's collection
                const appointmentDate = userHasAppointment ? user.appointment.date.toISOString().split('T')[0] : '';
                const appointmentTime = userHasAppointment ? user.appointment.time : '';

                // If user is found, render the G2 page with user details and available slots
                res.render('G2', { userLoggedIn: true, userDetails: user, userType: req.session.userType, currentDate: currDate, availableSlots, userHasAppointment, appointmentDate, appointmentTime });
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};


module.exports = exports;
