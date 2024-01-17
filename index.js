//Modules
const express = require('express');
const path = require('path');

//Creating Application
const app = express();

//Mid Ware
app.use(express.static('public'))

// get routing

//1. Dashboard route
app.get('/',(req, res) => {
  res.sendFile(path.resolve(__dirname,'view/dashboard.html'));
})

//2. Login route
app.get('/login',(req, res) => {
  res.sendFile(path.resolve(__dirname,'view/login.html'));
})

//3. G route
app.get('/g',(req, res) => {
  res.sendFile(path.resolve(__dirname,'view/G.html'));
})

//4. G2 route
app.get('/g2',(req, res) => {
  res.sendFile(path.resolve(__dirname,'view/G2.html'));
})

app.listen(4000, () => {console.log("Application link : http://localhost:4000/")});
