var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest:'public/images/uploads'});


var Student= require('../../model/Student');

//Student
router.get('/add',(req,res)=>{
  res.render("student/addstudent")
});

router.post('/add',upload.single('photo'),(req,res)=>{
var student=new Student();
student.fullName = req.body.sname;
student.email = req.body.semail;
student.password = req.body.pwd;
student.fatherName = req.body.fathername;
student.gender = req.body.gender;
student.dateOfBirth = req.body.dob;
student.roll = req.body.roll;
student.class = req.body.class;
student.phNumber = req.body.phno;
student.address = req.body.address;
if(req.file) student.imgUrl = '/images/uploads/'+ req.file.filename;
student.save(function(err,rtn){
  if(err) throw err;
  console.log(rtn);

  res.redirect('/admin/students/studentlist');
});
});

router.get('/studentlist',function(req,res){
Student.find(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
  res.render('student/student',{student:rtn});
});
});

router.post('/studentlist',function(req,res){
  var val1;
  var val2;
  console.log(req.body.class, req.body.section);
  if(req.body.section == 'a'){
    val1 =  31;
    val2 = 0;
  }else if (req.body.section == 'b') {
    val1 = 61;
    val2 = 30;
  }else if (req.body.section == 'c') {
    val1 = 101;
    val2 = 60;
  }else {
    val1 = 1000;
    val2 = 0;
  }
  console.log(val1,val2);
Student.find({$and:[{class:req.body.class},{roll:{$gt:val2,$lt:val1}}]},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('student/student',{student:rtn});
});
});

router.get('/update/:id', function (req,res) {
  Student.findById(req.params.id, function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('student/studentupdate',{student:rtn})
  })
})

router.post('/update',upload.single('photo'), function(req,res,next){
  console.log('call');
  var update={
    _id : req.body.id,
    fullName : req.body.sname,
    email : req.body.semail,
    password : req.body.pwd,
    fatherName : req.body.fathername,
    gender : req.body.gender,
    dateOfBirth :req.body.dob,
    roll : req.body.roll,
    class : req.body.class,
    phNumber : req.body.phno,
    address : req.body.address
 }
  if(req.file) update.imgUrl = '/images/uploads/'+ req.file.filename;
    Student.findByIdAndUpdate(req.body.id,{$set: update},function(err,rtn){
    if(err) throw err;
  console.log(rtn);
  res.redirect('/admin/students/studentlist');
  });
});

router.get('/delete/:id',function(req,res,next){
Student.findByIdAndRemove(req.params.id,function (err,rtn) {
  if (err) throw err;
  console.log(rtn);
  res.redirect('/admin/students/studentlist/');

});
});


module.exports = router;
