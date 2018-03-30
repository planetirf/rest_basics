'use strict';

var express = require('express');
var jsonParser = require('body-parser').json;
var routes = require('./routes');
var logger = require('morgan');
var app = express();

// call json parser function through all middleware
app.use(logger("dev"));
app.use(jsonParser());


// connect to mognodb

// instance mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qa');

var db = mongoose.connection;

db.on('error', function(err){
  console.error('connection error:', err);

});

db.once('open', function(){
  console.log('database connection successful');
});
  //

app.use('/questions', routes);

// Middleware: catch 404 and forward Error
app.use(function(req, res, next){
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Custom Erro Handlder
app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
})


var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Express server is listening on port", port)
});
