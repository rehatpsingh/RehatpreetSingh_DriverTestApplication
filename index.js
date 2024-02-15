// Modules
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

// Creating Application
const app = express();

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb+srv://rehatpreet2101:20031975Reh@fullstackclusterrehatpr.1qogxje.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define User schema and model
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    licenseNumber: { type: String, unique: true },
    carDetails: {
        make: String,
        model: String,
        year: Number,
        plateNo: String
    }
});
const User = mongoose.model('User', userSchema);

// Route to render dashboard page
app.get('/', (req, res) => {
    res.render('dashboard');
});

// Route to render G page
app.get('/G', (req, res) => {
    res.render('G');
});

// Route to render G2 page
app.get('/G2', (req, res) => {
    res.render('G2');
});

// Route to render Login page
app.get('/Login', (req, res) => {
    res.render('Login');
});

// Route to handle POST request from G2 page to save user data to MongoDB
app.post('/users', (req, res) => {
  const { firstName, lastName, age, licenseNumber, make, model, year, plateNumber } = req.body;
  const newUser = new User({ firstName, lastName, age, licenseNumber, carDetails: { make, model, year, plateNo: plateNumber } });
  newUser.save()
      .then(user => {
          console.log('User saved successfully:', user);
          // Render the G2 page again with a success message
          res.render('G2', { saved: true });
      })
      .catch(err => {
          console.error('Error saving user:', err);
          res.status(400).json({ error: err.message });
      });
});

// Route to handle POST request from G page to fetch user data from MongoDB
app.post('/fetchUser', (req, res) => {
    const { licenseNumber } = req.body;
    User.findOne({ licenseNumber })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'No User Found' });
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Route to handle POST request from G page to update user car details in MongoDB
app.post('/updateCarDetails', (req, res) => {
    const { licenseNumber, make, model, year, plateNumber } = req.body;
    User.findOneAndUpdate({ licenseNumber }, { $set: { 'carDetails.make': make, 'carDetails.model': model, 'carDetails.year': year, 'carDetails.plateNo': plateNumber } })
        .then(() => res.status(200).json({ message: 'Car details updated successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});


// Start the server
app.listen(4000, () => {
    console.log("Application running on http://localhost:4000/");
});
