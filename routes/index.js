var express = require('express');
var router = express.Router();
var Teacher=require('../model/Teacher');
var Student= require('../model/Student');
var Staff= require('../model/Staff');
var Subject=require('../model/Subject');
// var student = require('./students');
// var teacher = require('./teachers');
// var timetable = require('./timetables');
// var staff=require('./staffs');



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index')
});


router.get('/admin', function(req, res) {
  res.render('alogin')
});

router.get('/parent', function(req, res) {
  res.render('plogin')
});

router.get('/staff', function(req, res) {
  res.render('slogin')
});


router.get('/teacher', function(req, res) {
  res.render('tlogin')
});



router.get('/home',(req,res)=>{
  res.render("home")
});

router.get('/premission',(req,res)=>{
  res.render("permission")
});

router.get('/blog',(req,res)=>{
  res.render("blog")
});
router.get('/attendance',(req,res)=>{
  res.render("attendance")
});

router.get('/subject',(req,res)=>{
  res.render("subject")
});

router.get('/examresult',(req,res)=>{
  res.render("examresult")
});


router.get('/timetable',(req,res)=>{
  res.render("timetable")
});

router.get('/examination',(req,res)=>{
  res.render("examination")
});

router.get('/parent',(req,res)=>{
  res.render("parent")
});


router.get('/remark',(req,res)=>{
  res.render("remark")
});
router.get('/backup',(req,res)=>{
  res.render("addstudent")
});

router.get('/restore',(req,res)=>{
  res.render("addstudent")
});

module.exports = router;
