var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 var ParentSchema = new Schema({
   name:{
     type: String,
     required:true,
   },
   email:{
     type: String,
     required:true,
     unique:true,
   },
   password:{
     type: String,
     required:true,
   },
   address:{
     type: String,
     required: true
   },
   phone:{
     type: String,
     required: true
   },
   student_id:{
     type:Schema.Types.ObjectId,
     ref:'Student',
   }
 })
module.exports =mongoose.model('Parent',ParentSchema);
