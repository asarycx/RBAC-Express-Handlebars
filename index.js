
var hbs = require( 'express-handlebars')
var bodyParser = require("body-parser");
var express = require('express')
var app = express()
var db = require('./models/index');

// PART: Routes
var publicRoutes = require('./routes/public')
var userRoutes = require('./routes/user')
var bookRoutes = require('./routes/book')

// PART: This set the entire app view engine with Handlebar.js
app.set('view engine', 'hbs');
app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout:'layout',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// PART: Handlebars Helper
require("./config/handlebars-helper")

// PART: Bodu Parser Settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// PART: All the Routes
app.use('/user',userRoutes)
app.use('/book',bookRoutes)
app.use('/',publicRoutes)

app.listen(4000,() => console.log('Connected to Port 4000'))