var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Classroom = mongoose.model('Classroom');

router.get('/', function(req, res) {
  Classroom.find({}, function(err, classrooms) {
    if (err) console.log(err);
    res.render('classrooms/index', {classrooms: classrooms})
  });
});

router.get('/new', function(req, res) {
  res.render('classrooms/new');
});

router.get('/:id', function(req, res) {
  Classroom.findOne({_id: req.params.id}, function(err, classroom) {
    res.render('classrooms/show', {classroom: classroom});
  });
});

router.post('/', function(req, res) {
  var classroom = new Classroom(req.body);
  classroom.save(function(err) {
    if (err) console.log(err);
  });
  res.redirect('/classrooms/' + classroom._id)
});


module.exports = router;
