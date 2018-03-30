'use strict';

var express = require('express');
var router = express.Router();

var Question = require("./models").Question;

// express allows to trigger a handler whenbver a url parameter is present, in this case qID
// param takes "name of router", and callback function
// id = value from route paramter.
router.param("qID", function(req,res,next,id){
  Question.findById(id, function(err, doc) {
    if(err) return next(err);
    if(!doc) {
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.question = json(doc);
    return next();
  });

});

// answer url handler
router.param('id', function(req,res,next,id){
  // id() method takes 'textID'
  req.answer = req.questions.answers.id(id);
  if(!req.answer) {
    err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
})
// GET
//GET /questions route handler
router.get('/', function(req, res, next){
  //return all question docs
  //call find method - pass in empty object literal and callback function
  // ex. Question.find({}, function(err,questions){});
  // add additionall params to find method befroe callback
  // null to indicate full documents not partials
  // 3rd param obj literal sort
  // 4 param method signature
  // Question.find({}, null, {sort: {createdAt: -1}}, function(err,questions){
  //   if(err) return next(err);
  //   res.json(questions);

  Question.find({})
              .{sort: {createdAt: -1}}
              // chain additional method calls together .()
              // http://mongoosejs.com/docs/queries.html
              .exec(function(err,questions){
                if(err) return next(err);
                res.json(questions);
              });
});

// router for creating questions
router.post('/', function(req, res,next){
  var question = new Question(req.body);
  question.save(function(err,question){
      if(err) return next(err);
      // set update status OK
      res.status(201);
      // response w/ json question object
      res.json(question);
  });
  // return all the questions
  res.json({response: "you sent me a POST requestion", body: req.body});

});


//GET /questions route handler
router.get('/:qID', function(req, res){
  // findBYID() method passing query ID from url and callback
  // return question doc as json
  // ?? how the fuck does shit get assigned to doc?
  // Question.findById(req,.params.qID, function(err, doc) {
  //   if(err) return next(err);
  //   res.json(doc);
  // });
  // DELETED AND ADDED TO router.param(); above
  res.json(req.question);
});
// Router for creating an answers
// POST /questions/:id/answers
router.post("/:qID/answers/", function (req, res) {
  //grab question from router.param() url handler
  //access answers collection and push object literal version of doc to add
  req.question.answers.push(req.body);
  //save inquestion document and set HTTP status
  req.question.save(function(err,question){
      if(err) return next(err);
      // set update status OK
      res.status(201);
      // response w/ json question object
      res.json(question);
  });
});


// PUT question/qID/ansers/;id
// requires new router.param() above for id param

router.put("/:qID/answers/:id", function (req, res) {
  //use url handler built with router.param() method
  req.answer.update(req.body, function(err,result){
    if(err) return next(err);
    res.json(result);
  });

  // response of properties to be updated now packaged in req.body DELTE - below
  // res.json({
  //   response: "you send me a POST request to /answer/:id",
  //   questionId: req.params.qID,
  //   answerId: req.params.id,
  //   body: req.body
  // });
});

// delete question
router.delete("/:qID/answers/:id", function (req, res) {
  // call mongoose remove method
  req.answer.remove(function(err){
    // save parent question in callback
    req.question.save(function(err, question){
      // another callback to send question back to client
      if(err) return next(err);
      res.json(question);
    });
  })

  // response of properties to be deleted now packaged in req.body DELTE - below
  // res.json({
  //   response: "you send me a DELETE request to /answer/:id",
  //   questionId: req.params.qID,
  //   answerId: req.params.id,
  // });
});

// POST /questions/:qID/answers/:id/vote-up
// POST /questions/:qID/answers/:id/vote-down

// POST /questions/:qID/answers/:id/vote-:dir

router.post("/:qID/answers/:id/vote-:dir",function(req, res, next){
  if(req.params.dir.search(/^(up|down)$/) === -1) {
    var err = new Error("Not found vote dir rror");
    err.status = 405;
    next(err);
  } else {
    // readabilty to validator
    req.vote = req.params.dir;
    next();
  }
},
function (req, res) {
  // instance method vote on the answer, pass in vote string, w/ callback response to client
  req.answer.vote(req.vote, function(err,question){
    if(err) return next(err);
    res.json.question;
  })
  // removed bacuse instance method allows for clean application of answer
  // res.json({
  //   response: "you send me a post request to /vote/-" + req.params.dir,
  //   questionId: req.params.qID,
  //   answerId: req.params.id,
  //   vote: req.params.dir,
  // });
});


module.exports = router;
