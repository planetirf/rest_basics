'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// sorting function

var sortAnswers = function(a,b) {
  //- negative a before b
  //0 no change
  //+ positive a after b
  // if(a.votes === b.votes){
  //   if(a.updatedAt > b.updatedAt) {
  //     return -1;
  //   } else if (a.updatedAt < b.updatedAt) {
  //     return 1
  //   } else {
  //     return 0
  //   }
  // }
  if(a.votes === b.votes){
      return b.updatedAt - a.updatedAt;
  }
  return b.votes - a.votes;
}

var AnswerSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type: Number, default:0},
});

// instance methods
// apply updates to answer document
// call directly on schema when we want to update
// "nameofMethod" and callback for when operation is completed
AnswerSchema.method('update',function(updates,callback){
  // merge updates into answer document with object.assign
  // pasing in udocument referenced by this,
  //this updates Object  and set fresh date pon updatedAt ass 3rd parame
  Object.assign(this, updates, {updatedAt: new Date()});
  this.parent().save(callback);
)};

// vote instance method
AnswerSchema.method('vote',function(vote,callback){
  if(vote === "up") {
    this.votes += 1;
  } else {
    this.votes += 1;
  }
  this.parent().save(callback);
)};



var QuestionSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.},
  answers: [AnswerSchema]

});

QuestionSchema.pre('save', function(next){
  // pass sort answers function into .sort:
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  this.answers.sort(sortAnswers);
  next();
})

var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;
