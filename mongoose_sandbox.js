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
    type: {type: String, default: "goldfishies"},
    color: {type: String, default: "golden"},
    size: {type: String, default: "small"},
    mass: {type: Number, default: "0.01"},
    name: {type: String, default: "fishy"}
  });

var Animal = mongoose.model("Animal", AnimalSchema);

var elephant = new Animal({
  type: "elephant",
  size: "very lage",
  color: "gray",
  mass: 50000,
  name: "Dumbo"
});

var whale = new Animal({
  type: "whale",
  size: "very lage",
  mass: 500000,
  name: "whaley"
});

var animal = new Animal({});// goldfish

Animal.remove({}, function(err){
if (err) console.error(err);
  elephant.save(function(err){
    if (err) console.error(err);
    animal.save(function (err) {
      if (err) console.error(err);
      whale.save(function (err) {
        if (err) console.error(err);
        Animal.find({size: "very lage"}, function(err, animals){
          animals.forEach(function(animal){
            console.log(animal.name);
        });
          db.close(function(){
            console.log('connection closed');
      });

    });

  });
});
});

});
});
