const User = require('../models/DriverTestModel');

module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username, password })
        .then(user => {
            if (user) {
                req.session.userLoggedIn = true;
                req.session.username = username; // Set the username in the session
                res.redirect('/');
            } else {
                // If user credentials are invalid, redirect to login page with userLoggedIn as false
                req.session.userLoggedIn = false;
                res.redirect('login');
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};
