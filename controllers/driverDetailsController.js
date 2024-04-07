const User = require('../models/DriverTestModel'); // Importing the User model

// Controller function to show appointments for the Examiner
exports.renderDriverDetailsPage = async (req, res) => {
    try {
        // Extract the driverId from the request query parameters
        const driverId = req.query.driverId;

        // Fetch user details corresponding to the provided driverId
        const driverDetails = await User.findById(driverId);

        console.log(driverDetails);
        // Determine if the user is logged in
        const userLoggedIn = true;

        // Define the user type (assuming the user is an Examiner)
        const userType = "Examiner";

        // Render the 'driverDetails' view with the fetched user details, appointments data, userLoggedIn status, and userType
        res.render('driverDetails', { driverDetails, userLoggedIn, userType });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
