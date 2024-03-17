const bcrypt = require('bcrypt');
const User = require('../models/DriverTestModel');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        
        // If user is found, compare passwords
        if (user) {
            // Compare the entered password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (passwordMatch) {
                // Passwords match, set session variables and redirect to dashboard
                req.session.userLoggedIn = true;
                req.session.username = username;
                res.redirect('/');
            } else {
                // Passwords do not match, redirect to login page
                req.session.userLoggedIn = false;
                res.redirect('/login');
            }
        } else {
            // User not found, redirect to login page
            req.session.userLoggedIn = false;
            res.redirect('/login');
        }
    } catch (err) {
        // Handle error
        res.status(500).json({ error: err.message });
    }
};
