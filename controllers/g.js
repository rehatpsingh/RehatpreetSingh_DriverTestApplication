const User = require('../models/DriverTestModel');

module.exports = async (req, res) => {
    const userLoggedIn = req.session.userLoggedIn || false;
    
    if (userLoggedIn) {
        const username = req.session.username;

        try {
            // Find the user based on the username
            const user = await User.findOne({ username });

            if (!user || !user.licenseNumber) {
                // If user is not found or does not have a license number, render the G page with userNotFound true
                res.render('G', { userNotFound: true,userType: req.session.userType, userLoggedIn, userDetails: null });
            } else {
                // If user is found and has a license number, render the G page with user details
                res.render('G', { userDetails: user, userType: req.session.userType, userLoggedIn });
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
