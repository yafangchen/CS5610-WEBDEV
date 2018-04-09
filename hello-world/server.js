// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'this is the secret',
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3100';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

//var serverSide = require("./server/test-mongodb/app");
//serverSide(app);


// For Build: Catch all other routes and return the index file -- BUILDING
/*app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
}); */

require("./assignment/app.js")(app);

//server.listen( port , () => console.log('Running on port 3100'));

app.use('*', function (req, res) {
  const index = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(index);
});

server.listen( port , function() {
  console.log('Node app is running on port', app.get('port'))});
