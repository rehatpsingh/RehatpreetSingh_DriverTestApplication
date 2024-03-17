const User = require('../models/DriverTestModel');
module.exports = async (req, res) => {
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
                // If user is found, render the G2 page with user details
                res.render('G2', { userLoggedIn: true, userDetails: user });
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}