var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 var StaffSchema = new Schema({
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
    nrc: {
        type: String,
        required: true,
    },


    dateOfBirth: {
        type: String,
        required: true,
    },
    duty: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    phNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },

});



module.exports =  mongoose.model('Staff', StaffSchema);
