var express = require('express');
var router = express.Router();

var Teacher= require('../../model/Teacher');

//Teacher
router.get('/teacheradd',(req,res)=>{
  res.render("teacher/addteacher")
});

router.get('/home',(req,res)=>{
  res.render("teacher/home")
});

router.post('/teacheradd',(req,res)=>{
var teacher=new Teacher();
teacher.fullName = req.body.fullName;
teacher.email = req.body.email;
teacher.password = req.body.pwd;
teacher.gender = req.body.gender;
teacher.dateOfBirth = req.body.DOB;
teacher.nrc = req.body.NRC;
teacher.role = req.body.role;
teacher.phno = req.body.phNumber;
teacher.address = req.body.address;
teacher.desc = req.body.description;
teacher.save(function(err,rtn){
  if(err) throw err;
  console.log(rtn);
  res.redirect('/admin/teachers/teacherlist');
});
});

router.get('/teacherlist',function(req,res){
Teacher.find(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
  res.render('teacher/teacher',{teacher:rtn});
});
});

router.get('/teacherupdate/:id', function (req,res) {
  Teacher.findById(req.params.id, function (err,rtn) {
    if(err) throw err;
    res.render('teacher/teacherupdate',{teacher:rtn})
  })
})

router.post('/teacherupdate', function(req,res,next){
  console.log('call');
  var update={
    fullName : req.body.tname,
    email : req.body.temail,
    password : req.body.pwd,
    gender : req.body.gender,
    dateOfBirth : req.body.tdob,
    nrc : req.body.NRC,
    role : req.body.role,
    phno : req.body.tphno,
    address : req.body.taddress,
    desc: req.body.desc
 }
    Teacher.findByIdAndUpdate(req.body.id,{$set: update},function(err,rtn){
    if(err) throw err;
  console.log(rtn);
  res.redirect('/admin/teachers/teacherlist');
  });
});

router.get('/teacherdelete/:id',function(req,res,next){
Teacher.findByIdAndRemove(req.params.id,function (err,rtn) {
  if (err) throw err;
  console.log(rtn);
  res.redirect('/admin/teachers/teacherlist/');

});
});

module.exports = router;
