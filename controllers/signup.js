const User = require('../models/DriverTestModel');

module.exports = (req, res) => {
    const { firstName, lastName, age, licenseNumber, username, password, userType, make, model, year, plateNumber } = req.body;
    const newUser = new User({ firstName, lastName, age, licenseNumber, username, password, userType, carDetails: { make, model, year, plateNo: plateNumber } });
    newUser.save()
        .then(user => {
            console.log('User saved successfully:', user);
            res.redirect('/login?signupSuccess=true'); 
        })
        .catch(err => {
            console.error('Error saving user:', err);
            res.status(400).json({ error: err.message });
        });
}
