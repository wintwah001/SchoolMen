var express = require('express');
var router = express.Router();
var Teacher = require('../model/Teacher');
var Timetable = require('../model/Timetable');
var Student = require('../model/Student');
var Attendance = require('../model/Attendance');
var _ = require('underscore');

router.get('/home',(req,res)=>{
  Teacher.findById(req.session.users.id,(err,rtn)=>{
    if(err) throw err;
    console.log(req.session.users.id);
    res.render('teacher/home',{teacher:rtn})
  })
})

router.get('/timetable',(req,res)=>{
  Timetable.find({teacherName:req.session.users.name},(err,rtn)=>{
    if(err) throw err;
    res.render('teacher/timetable',{subj:rtn})
  })
})

router.get('/attendance',(req,res)=>{
  var d = new Date();
  var dNow = (d.getDay()+2).toString();
  console.log(dNow);
  Timetable.find({$and:[{teacherName:req.session.users.name},{day:dNow}]},(err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.render('teacher/attendance',{subj:rtn})
  })
})

router.get('/attcalling/:class/:section/:subj',(req,res)=>{
  Student.find({class:req.params.class}).sort({roll:1}).exec((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.render('teacher/att-calling',{stu:rtn,class:req.params.class,subj:req.params.subj})
  })
});

router.post('/calling', function(req, res, next) {
  var list = JSON.parse(req.body.students);
  Student.find({class:req.body.stuclass},function (err,rtn) {
    if(err) throw err;
    var m = new Date();
    var month = m.getMonth();
    var day = m.getDay();
    for(var j = 0; j < rtn.length; j++){
      var attendance = new Attendance();
      attendance.teacher_id = req.session.users.id;
      attendance.subjectName = req.body.sub;
      attendance.student_id = rtn[j]._id;
      attendance.month = month;
      attendance.day = day;
      attendance.attendance_count = (_.contains(list,rtn[j]._id.toString()))? 1 : 0;
      attendance.save(function (err2,rtn2) {
        if(err2) throw err2;
      });
    }
    res.json({status: true})
  })

});

router.get('/manageAtt', function(req, res, next) {
  Timetable.aggregate([
    {$match:{teacherName: req.session.users.name}},
    {$group:{_id:'$class', subj:{$push: "$subname"}}}
    ],function (err,rtn) {
    if(err) throw err;
    var data = {};
    for (var i = 0; i < rtn.length; i++) {
      rtn[i].subj = _.uniq(rtn[i].subj);
    }
    console.log(rtn);
    res.render('teacher/manage-att', { title: 'Express', sub: rtn});
  })

});
router.get('/manage/:id/:sub', function(req, res, next) {
  console.log(req.params.sub,req.session.users.id);
  Attendance.find({$and:[{subjectName:req.params.sub},{teacher_id:req.session.users.id}]},function (err,rtn) {
    if(err) throw err;
    Student.find({class:req.params.id},function(err2,rtn2){
      if(err2) throw err2;
      res.render('teacher/manage', { title: 'Express', stu: rtn2, data: rtn, subj: req.params.sub, cla :req.params.id});
    });
  });
});

module.exports = router;
