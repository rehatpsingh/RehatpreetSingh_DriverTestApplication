const bcrypt = require('bcrypt');
const User = require('../models/DriverTestModel');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        
        // If user is found, compare passwords
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (passwordMatch) {
                req.session.userLoggedIn = true;
                req.session.username = username;
                res.redirect('/');
            } else {
                req.session.userLoggedIn = false;
                res.redirect('/login');
            }
        } else {
            // User not found, redirect to login page
            req.session.userLoggedIn = false;
            res.redirect('/login');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
