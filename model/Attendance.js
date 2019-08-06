var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 var AttendanceSchema = new Schema({
   teacher_id:{
     type:Schema.Types.ObjectId,
     ref:'Teacher',
   },
   subjectName:{
     type:String,
     require:true,
   },
 student_id:{
     type:Schema.Types.ObjectId,
     ref:'Student',
   },

   month:{
     type:String,
     require:true,
   },
   day:{
     type:String,
     require:true,
   },
   inserted:{
     type:Date,
     default:Date.now
   },
   attendance_count:{
     type:Number,
     require:true,
   },
   total_count:{
     type:Number,
     default: 1
   },

 });
module.exports =mongoose.model('Attendance',AttendanceSchema);
