'use strict';

var express = require('express');
var app = express();

app.use(function(req, res, next){
  console.log("first middleware piece");
  next();
});

// : denotes express paramater
app.use('/different:id',function(req, res, next){
  console.log("second middleware piece" + req.params.id);
  next();
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Express server is listening on port", port)
});
