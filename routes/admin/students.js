var express = require('express');
var router = express.Router();

var Student= require('../../model/Student');

//Student
router.get('/add',(req,res)=>{
  res.render("student/addstudent")
});

router.post('/add',(req,res)=>{
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

router.get('/update/:id', function (req,res) {
  Student.findById(req.params.id, function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('student/studentupdate',{student:rtn})
  })
})

router.post('/update', function(req,res,next){
  console.log('call');
  var update={
    fullname : req.body.sname,
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
    Student.findByIdAndUpdate(req.body.id,{$set: update},function(err,rtn){
    if(err) throw err;
  console.log(rtn);
  res.redirect('/admin/students/studentlist/'+rtn._id);
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
