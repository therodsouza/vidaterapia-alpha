var express = require("express");
var app = express();
var contributors = require('./routes/contributors');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/vidaterapia');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongodb");
});

app.use(express.static("./app"));
app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});
app.use('/colaboradores', contributors);

app.listen(8080);

console.log("Express app running on port 8080");

module.exports = app;