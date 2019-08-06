var express = require('express');
var router = express.Router();

var Subject= require('../../model/Subject');
var Teacher= require('../../model/Teacher');

router.get('/addsubject',(req,res)=>{
  Teacher.find((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.render("subject/addsubject",{teacher:rtn})
  })

});

router.post('/addsubject',function(req,res,next){
  console.log('call',req.body.teacher);
  var subject=new Subject();
  subject.teacher_id=req.body.teacher_id;
  subject.subname=req.body.subname;
  subject.class=req.body.class;

  subject.save(function(err,rtn){
    if (err)throw err;
    res.redirect('/admin/subjects/subjectlist');
  });

});

router.get('/subjectlist',function(req,res){
Subject.find({}).populate('teacher_id').exec(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
  res.render('subject/subject',{subjects:rtn});
});
});

router.get('/update/:id', function (req,res) {
  Subject.findById(req.params.id, function (err,rtn) {
    if(err) throw err;
    Teacher.find((err2,rtn2)=>{
      if(err2) throw err2;
      res.render('subject/subjectupdate',{subject:rtn,teacher:rtn2})
    });
  })
})

router.post('/update', function(req,res,next){
  console.log('call');
  var update={
    teacher_id:req.body.teacher_id,
    subname:req.body.subname,
    class:req.body.class
  }
     Subject.findByIdAndUpdate(req.body.id,{$set: update},function(err,rtn){
     if(err) throw err;
   console.log(rtn);
   res.redirect('/admin/subjects/subjectlist');
   });
 });

 router.get('/delete/:id',function(req,res,next){
 Subject.findByIdAndRemove(req.params.id,function (err,rtn) {
   if (err) throw err;
   console.log(rtn);
   res.redirect('/admin/subjects/subjectlist');

 });
 });

module.exports = router;
