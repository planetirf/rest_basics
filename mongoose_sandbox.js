'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

var db = mongoose.connection;

db.on('error', function(err){
  console.error('connection error:', err);

});

db.once('open', function(){
  console.log('database connection successful');

  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type: String,
    color: String,
    size: String,
    mass: Number,
    name: String,
  });

var Animal = mongoose.model("Animal", AnimalSchema);

var elephant = new Animal({
  type: "elephant",
  size: "very lage",
  color: "gray",
  mass: 50000,
  name: "Dumbo"
});

elephant.save(function(err){
  if (err) console.error("save failed", err);
  else console.log('saved!');
  db.close(function(){
    console.log('connection closed');
  });
});
});
