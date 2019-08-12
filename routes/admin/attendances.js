var express = require('express');
var router = express.Router();

var Attendance= require('../../model/Attendance');

router.get('/add',(req,res)=>{
  res.render('attendance/addattendance');
})

router.get('/list',(req,res)=>{
  res.render('attendance/attendance');
})

module.exports = router;
