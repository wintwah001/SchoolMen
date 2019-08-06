var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TimeSchema=new Schema({
  teacherName:{
    type:String,
    require:true,
  },

  subname:{
    type:String,
    require:true,
  },
  class:{
    type:String,
    require:true,
  },
  section:{
    type:String,
    require:true,
  },

  time:{
    type:String,
    require:true,
  },
  day:{
    type:String,
    require:true,
  },
});
module.exports=mongoose.model('Timetable',TimeSchema);
