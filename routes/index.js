var express = require('express');
var router = express.Router();
var Teacher=require('../model/Teacher');
var Student= require('../model/Student');
var Staff= require('../model/Staff');
var Subject=require('../model/Subject');
var Admin = require('../model/Admin');
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

router.post('/admin', function (req, res) {
  Admin.findOne({email:req.body.email},(err,rtn)=>{
    if(err) throw err;
    if(rtn != null && rtn.password == req.body.password){
      res.redirect('/home');
    }else {
      res.redirect('/admin');
    }
  })
})

router.get('/parent', function(req, res) {
  res.render('plogin')
});

router.get('/staff', function(req, res) {
  res.render('slogin')
});


router.get('/teacher', function(req, res) {
  res.render('tlogin')
});

router.post('/teacher', function (req,res) {
  Teacher.findOne({email:req.body.email},(err,rtn)=>{
    if(err) throw err;
    if(rtn != null && req.body.password == rtn.password){
      res.redirect('/home')
    }else {
      res.redirect('/teacher');
    }
  })
})

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

router.get('/register',(req,res)=>{
  res.render("register")
});

router.post('/register',(req,res)=>{
  var admin = new Admin();
  admin.name = req.body.name;
  admin.email = req.body.email;
  admin.password = req.body.password;
  admin.save((err,rtn)=>{
    if(err) throw err;
    res.redirect('/');
  })
})

module.exports = router;
