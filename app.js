'use strict';

var express = require('express');
var app = express();

app.use(function(req, res, next){
  req.myMessage = "The Leaves on the trees are:" + req.query.color
  next();
});

// : denotes express paramater
app.use('/different',function(req, res, next){
  console.log(req.myMessage);
  next();
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Express server is listening on port", port)
});
