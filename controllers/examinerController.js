const User = require('../models/DriverTestModel'); 

// Controller function to show appointments for the Examiner
exports.showAppointments = async (req, res) => {
    try {
        // Fetch appointments from the database for the logged-in Examiner user
        const appointments = await User.find({ testType: { $ne: null } });

        // Determine if the user is logged in
        const userLoggedIn = true;

        // Define the user type (assuming the user is an Examiner)
        const userType = "Examiner";

        // Render the 'examiner' view with the fetched appointments data, userLoggedIn status, and userType
        res.render('examiner', { appointments, userLoggedIn, userType });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Controller function for handling examiner actions
exports.examinerAction = async (req, res) => {
    try {
        const { comment, passFail, userId } = req.body;
        
        // Find the user by userId
        const user = await User.findById(userId);

        // If user is not found, handle the error
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update user properties
        user.passOrFail = passFail;
        user.comment = comment;

        // Save the updated user object
        await user.save();

        // Redirect to a suitable route after handling the action
        res.redirect('/examiner'); // Assuming redirecting back to the examiner page after action
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
