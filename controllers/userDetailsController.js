const User = require('../models/DriverTestModel');
const Appointment = require('../models/appointment');

module.exports = async (req, res) => {
    const { firstName, lastName, age, licenseNumber, dob, make, model, year, plateNumber, appointmentDate, appointmentTime, testType } = req.body;

    // Retrieve the username of the logged-in user from the session
    const username = req.session.username;

    try {
        // Find the user based on the username
        const user = await User.findOne({ username });

        if (!user) {
            // If user is not found, return an error
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's information with the form data
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.licenseNumber = licenseNumber;
        user.dob = dob;
        user.carDetails.make = make;
        user.carDetails.model = model;
        user.carDetails.year = year;
        user.carDetails.plateNo = plateNumber;
        if(testType == "G2")
        {
            user.appointment.g2date = appointmentDate;
            user.appointment.g2time = appointmentTime;
        }
        else 
        {
            user.appointment.gdate = appointmentDate;
            user.appointment.gtime = appointmentTime;
        }
        user.testType = testType;

        // Save the updated user to the database
        await user.save();

        // Find the appointment corresponding to the selected date and time
        const appointment = await Appointment.findOne({ date: appointmentDate, time: appointmentTime });

        if (appointment) {
            // Update the appointment's isTimeSlotAvailable value to false
            appointment.isTimeSlotAvailable = false;
            await appointment.save();
        }

        // Redirect to the dashboard or another appropriate page after successful update
        res.redirect('/');
    } catch (err) {
        console.error('Error updating user:', err);
        // Handle the error appropriately, such as rendering an error page or sending an error response
        res.status(500).json({ error: 'Error updating user in database' });
    }
}
