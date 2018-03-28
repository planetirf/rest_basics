'use strict';

var express = require('express');
var jsonParser = require('body-parser').json;
var app = express();

// check if request body object has property named body
var jsonCheck = function(req, res, next){
  if(req.body){
    console.log("the sky is", req.body.color)
  } else {
    console.log("error")
  }
  next();
}

// call json parser function through all middleware
app.use(jsonCheck);
app.use(jsonParser());
app.use(jsonCheck);

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Express server is listening on port", port)
});
