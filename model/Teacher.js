const mongoose=require('mongoose');
var Schema = mongoose.Schema;
var teacherSchema = new Schema({
  fullName: {
      type: String,
      required: true,
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
  gender: {
      type: String,
      required: true,
  },
  dateOfBirth: {
      type: String,
      required: true,
  },
  nrc: {
      type: String,
      required: true,
  },
  role: {
      type: String,
      required: true,
    },
  phno: {
      type: String,
      required: true,
  },
  address: {
      type: String,
      required: true,
  },
  desc:{
    type: String,
    required: true,
  }
});
module.exports =  mongoose.model('Teacher', teacherSchema);
