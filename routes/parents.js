var express = require('express');
var router = express.Router();
var Student = require('../model/Teacher');
var Parent = require('../model/Parent');
var Timetable = require('../model/Timetable');
var Attendance = require('../model/Attendance');

router.get('/home',(req,res)=>{
  Parent.findById(req.session.users.id,(err,rtn)=>{
    if(err) throw err;
    res.render('parent/home',{parent:rtn});
  })
})

router.get('/timetable', function(req, res, next) {
  Parent.findById(req.session.users.id).populate('student_id').exec((err,rtn)=>{
    if(err) throw err;
    var sect;
    var roll = Number(rtn.student_id.roll);
    if(roll < 31){
      sect = 'a'
    }else if (30 < roll < 61) {
      sect = 'b'
    }else {
      sect = 'c'
    }
    console.log('section',sect);
    Timetable.find({$and:[{class:rtn.student_id.class},{section:sect}]}).sort({day:1,time:1}).exec(function (err2,rtn2) {
      if(err2) throw err2;
      res.render('parent/time-table', { title: 'Express',subj:rtn2,section:sect,student:rtn.student_id.fullName });
  });
});
});
router.get('/attendance', function(req, res, next) {
  Parent.findById(req.session.users.id).populate('student_id').exec((err3,rtn3)=>{
    if(err3) throw err3
    Attendance.aggregate([{$match:{student_id: rtn3.student_id._id}},{$group:{_id:{sub:'$subjectName',month:'$month'},count:{$sum:"$attendance_count"},tolC:{$sum:'$total_count'}}}],function (err2,rtn2) {
      if(err2) throw err2;
      console.log('aa',rtn2);
      Timetable.aggregate([{$match:{class:rtn3.student_id.class}},{$group:{_id:'null',subj: { $addToSet: "$subname"} }}],function (err,rtn) {
        if(err) throw err;
        console.log('bb',rtn[0].subj);
        res.render('parent/attendance', { title: 'Express',subj:rtn[0].subj, data:rtn2,name: rtn3.student_id.fullName});
      });
    });
  });
});

module.exports = router;
