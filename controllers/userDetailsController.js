const User = require('../models/DriverTestModel');
module.exports = (req, res) => {
    const { firstName, lastName, age, licenseNumber, dob, make, model, year, plateNumber } = req.body;

    // Retrieve the username of the logged-in user from the session
    const username = req.session.username;

    // Find the user based on the username
    User.findOne({ username })
        .then(user => {
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

            // Save the updated user to the database
            return user.save();
        })
        .then(updatedUser => {
            // Redirect to the dashboard or another appropriate page after successful update
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error updating user:', err);
            // Handle the error appropriately, such as rendering an error page or sending an error response
            res.status(500).json({ error: 'Error updating user in database' });
        });
}

