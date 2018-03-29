'use strict';

var express = require('express');
var router = express.Router();


// GET
//GET /questions route handler
router.get('/', function(req, res){
  // return all the questions
  console.log('yo');
  res.json({response: "you sent me a GET requestion"});

});

// router for creating questions
router.post('/', function(req, res){
  // return all the questions
  res.json({response: "you sent me a POST requestion", body: req.body});

});


//GET /questions route handler
router.get('/:qID', function(req, res){
  // return all the questions
  res.json({response: "you sent me a GET requestion for ID " + req.params.qID});

});
// Router for creating an answers
// POST /questions/:id/answers
router.post("/:qID/answers/", function (req, res) {
  res.json({
    response: "you send me a POST request to /answer",
    questionId: req.params.qID,
    body: req.body
  });
});

router.put("/:qID/answers/:id", function (req, res) {
  res.json({
    response: "you send me a POST request to /answer/:id",
    questionId: req.params.qID,
    answerId: req.params.id,
    body: req.body
  });
});

// delete question
router.delete("/:qID/answers/:id", function (req, res) {
  res.json({
    response: "you send me a DELETE request to /answer/:id",
    questionId: req.params.qID,
    answerId: req.params.id,
  });
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
    next();
  }
}, function (req, res) {
  res.json({
    response: "you send me a post request to /vote/-" + req.params.dir,
    questionId: req.params.qID,
    answerId: req.params.id,
    vote: req.params.dir,
  });
});


module.exports = router;
