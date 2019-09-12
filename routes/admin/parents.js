var express = require('express');
var router = express.Router();
var Student = require('../../model/Student');
var Parent = require('../../model/Parent');

router.get('/list',function (req,res) {
  Parent.find({}).populate('student_id').exec((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.render('parent/parent',{parents: rtn});
  })

});

router.get('/add', function (req,res) {
  Student.find({},{fullName:1 , class:1, _id: 0}).sort({class:1}).exec((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.render('parent/addparent',{stu:rtn});
  })

})

router.post('/add', function (req,res) {
  Student.findOne({$and:[{fullName:req.body.fullName }, {class:req.body.class}]},(err,rtn)=>{
    if(err) throw err;
     var parent = new Parent();
     parent.name = req.body.name;
     parent.email = req.body.email;
     parent.password = req.body.password;
     parent.phone = req.body.phone;
     parent.address = req.body.address;
     parent.student_id = rtn._id;
     parent.save((err2,rtn2)=>{
       if(err2) throw err2;
       res.redirect('/admin/parents/list');
     })
  })
})

router.get('/update/:id',function (req,res) {
  Parent.findById(req.params.id,(err,rtn)=>{
    if(err) throw err;
    Student.find({},{fullName:1 , class:1, _id: 0}).sort({class:1}).exec((err2,rtn2)=>{
      if(err2) throw err2;
    res.render('parent/parentupdate',{parent:rtn,stu:rtn2})
  })
})
})

router.post('/parentupdate',function (req,res) {
  console.log('callllll');
  var update = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone,
    address:req.body.address
  }
  Student.findOne({$and:[{fullName:req.body.fullName }, {class:req.body.class}]},(err,rtn)=>{
    if(err) throw err;
    if(rtn != null) update.student_id = rtn._id;
    Parent.findByIdAndUpdate(req.body.id,{$set:update},(err2,rtn2)=>{
      if(err2) throw err2;
      res.redirect('/admin/parents/list');
    })
  });
});

router.post('/parentupdate2',function (req,res) {
  console.log('callllll');
  var update = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone,
    address:req.body.address
  }
  Student.findOne({$and:[{fullName:req.body.fullName }, {class:req.body.class}]},(err,rtn)=>{
    if(err) throw err;
    if(rtn != null) update.student_id = rtn._id;
    Parent.findByIdAndUpdate(req.body.id,{$set:update},(err2,rtn2)=>{
      if(err2) throw err2;
      res.redirect('/parents/home');
    })
  });
});

module.exports = router;
