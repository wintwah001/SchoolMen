var express = require('express');
var router = express.Router();

var Staff= require('../../model/Staff');


//Staff
router.get('/staffadd',(req,res)=>{
  res.render("staff/addstaff")
});

router.post('/staffadd',(req,res)=>{
var staff=new Staff();
staff.fullName = req.body.name;
staff.email = req.body.email;
staff.password = req.body.pwd;
staff.gender = req.body.gender;
staff.nrc = req.body.NRC;
staff.dateOfBirth = req.body.dob;
staff.duty = req.body.duty;
staff.position = req.body.position;
staff.phNumber = req.body.phno;
staff.address = req.body.address;
staff.save(function(err,rtn){
  if(err) throw err;
  console.log(rtn);

  res.redirect('/admin/staffs/stafflist');
});
});

router.get('/stafflist',function(req,res){
Staff.find(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
  res.render('staff/staff',{staff:rtn});
});
});

router.get('/staffupdate/:id', function (req,res) {
  console.log('ss---',req.params.id,'===');
  Staff.findById(req.params.id, function (err,rtn) {
    if(err) throw err;
    console.log('aaa[[[',rtn,'====fgf');
    res.render('staff/staffupdate',{staff:rtn})
  })
})

router.post('/staffupdate', function(req,res,next){
  console.log('call');
  var update={
    fullName : req.body.name,
    email : req.body.email,
    password : req.body.pwd,
    gender : req.body.gender,
    nrc : req.body.NRC,
    dateOfBirth : req.body.dob,
    duty:req.body.duty,
    position:req.body.position,
    phNumber:req.body.phno,
    address : req.body.address
 }
    Staff.findByIdAndUpdate(req.body.id,{$set: update},function(err,rtn){
    if(err) throw err;
  console.log(rtn);
  res.redirect('/admin/staffs/stafflist/'+rtn._id);
  });
});

router.get('/staffdelete/:id',function(req,res,next){
Staff.findByIdAndRemove(req.params.id,function (err,rtn) {
  if (err) throw err;
  console.log(rtn);
  res.redirect('/admin/staffs/stafflist/');

});
});
//End of Staff
module.exports = router;
