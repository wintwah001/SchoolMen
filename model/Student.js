var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 var StudentSchema = new Schema({
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

    fatherName: {
        type: String,
        required:true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },

    roll: {
        type: String,
        required: true,
    },

    class: {
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
    imgUrl: {
      type: String,
      required : true,
    }

});

StudentSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
StudentSchema.set('toJSON', {
    virtuals: true
});


module.exports =  mongoose.model('Student', StudentSchema);
