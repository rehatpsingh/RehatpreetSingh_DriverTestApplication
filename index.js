// Modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

//controllers
const dashboardController = require('./controllers/dashboard');
const gController = require('./controllers/g');
const g2Controller = require('./controllers/g2');
const loginController = require('./controllers/login');
const renderLoginController = require('./controllers/renderLogin');
const signupController = require('./controllers/signup');
const updateUserDetailsController = require('./controllers/userDetailsController');
const logoutController = require('./controllers/logout');

// Creating Application
const app = express();

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'FullStack',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// MongoDB Connection
mongoose.connect('mongodb+srv://rehatpreet2101:20031975Reh@fullstackclusterrehatpr.1qogxje.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Get route using render
// 1. Dashboard
app.get('/', dashboardController);

// 2. G page
app.get('/G', gController);

//3. G2 page
app.get('/G2', g2Controller);

//4. Login page
app.get('/login', renderLoginController); 

//5. POST request for Login
app.post('/login', loginController); 

//6. Signup
app.post('/signup', signupController);

//7. UpdateUserDetails
app.post('/updateUserDetails', updateUserDetailsController); 

//8. Logout
app.get('/logout', logoutController);

// Start the server
app.listen(4000, () => {
    console.log("Application running on http://localhost:4000/");
});
