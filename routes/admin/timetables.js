var express = require('express');
var router = express.Router();
var Timetable= require('../../model/Timetable');
var Subject= require('../../model/Subject');
var Teacher= require('../../model/Teacher');

router.get('/addtimetable',(req,res)=>{
  Subject.find({},{'subname': 1, _id: 0}).populate('teacher_id',{fullName:1, _id:0}).sort({teacher_id:1}).exec(function (err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('timetable/addtimetable',{subj:rtn})
  })

})

router.post('/addtimetable',function(req,res,next){
var timetable=new Timetable();
timetable.teacherName=req.body.teacher_id;
timetable.subname=req.body.subname;
timetable.class=req.body.class;
timetable.section=req.body.section;
timetable.time=req.body.time;
timetable.day=req.body.day;

timetable.save(function(err,rtn){
    if (err)throw err;
    res.redirect('/admin/timetables/timetablelist');
  });
});

router.get('/timetablelist',function(req,res,next){
  Timetable.find({},function(err,rtn){
    if(err) throw err;
    res.render('timetable/timetable',{subject:rtn});
  });
});

router.get('/timetableDetail/:class/:section',function(req,res,next){
  // res.end(req.params.section);
  Timetable.find({ $and:[{class:req.params.class},{section:req.params.section}]},function(err,rtn){
    if(err) throw err;
    res.render('timetable/timetable-detail',{subj:rtn});
  });
});

router.post('/duplicate',function (req,res) {
  Timetable.find({ $and:[{class:req.body.cla},{day: req.body.day},{time: req.body.time},{section:req.body.sec}] },function (err,rtn) {
    if(err) throw err;
    if(rtn.length) {
      console.log('have');
      res.json({ status: false, msg: 'Timetable Already inserted!'});
    }
    else {
      console.log('not have');
      res.json({ status: true,msg: 'Timetable inserted!'});
    }
  })
})
module.exports = router;
