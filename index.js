//Modules
const express = require('express');
const path = require('path');
const ejs = require('ejs');

//Creating Application
const app = express();

//Mid Ware
app.use(express.static('public'))
app.set('view engine', 'ejs')

//get routing using render
//1. Index route
app.get('/', (req,res)=> {
  res.render('dashboard');
})

//2. G route
app.get('/G', (req,res)=> {
  res.render('G');
})

//3. G2 route
app.get('/G2', (req,res)=> {
  res.render('G2');
})

//4. Login route
app.get('/Login',(req, res) => {
  res.render('Login');
})

app.listen(4000, () => {console.log("Application link : http://localhost:4000/")});
