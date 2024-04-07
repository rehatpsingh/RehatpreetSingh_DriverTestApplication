const User = require('../models/DriverTestModel');
const Appointment = require('../models/appointment');
const { format } = require('date-fns-tz');

module.exports = async (req, res) => {
    const userLoggedIn = req.session.userLoggedIn || false;
    
    if (userLoggedIn) {
        const username = req.session.username;

        try {
            // Find the user based on the username
            const user = await User.findOne({ username });
            console.log(user);
            if (!user || !user.licenseNumber) {
                // If user is not found or does not have a license number, render the G page with userNotFound true
                res.render('G', { userNotFound: true, userType: req.session.userType, userLoggedIn, userDetails: null });
            } else {
                const currentDate = new Date();
                const currDate = format(currentDate, 'yyyy-MM-dd', { timeZone: 'Etc/UTC' }).toString().split('T')[0];
                const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Etc/UTC' });
                const dateParts = formattedDate.split(' ')[0]; // Get only the date part
                const convertedDate = dateParts + "T00:00:00.000+00:00";

                // Fetch available appointment slots for the current date
                const availableSlots = await Appointment.find({ date: convertedDate, isTimeSlotAvailable: true, testType: "G" });

                // Determine if the user has an appointment (consider both date and time)
                const userHasAppointment = user.appointment && user.appointment.gdate && user.appointment.gtime;

                // If user has an appointment, fetch appointment date and time from user's collection
                const appointmentDate = userHasAppointment ? user.appointment.gdate.toISOString().split('T')[0] : '';
                const appointmentTime = userHasAppointment ? user.appointment.gtime : '';
                // If user is found and has a license number, render the G page with user details
                res.render('G', { userDetails: user, userType: req.session.userType, userLoggedIn, currentDate: currDate, availableSlots, userHasAppointment, appointmentDate, appointmentTime });
            }
        } catch (error) {
            console.error('Error finding user:', error);
            res.status(500).json({ error: 'Error finding user in database' });
        }
    } else {
        // If user is not logged in, redirect to login page
        res.redirect('/Login');
    }
};
