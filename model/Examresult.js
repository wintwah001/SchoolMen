var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 var ExamSchema = new Schema({

   student_id:{
     type:Schema.Types.ObjectId,
     ref:'Student',
   },
    fullName: {
        type: String,
        required: true,
    },

    fatherName: {
        type: String,
        required:true,
    },
    Myanmar: {
        type: String,
        required: true,
    },
    English: {
        type: Date,
        required: true,
    },
    Mathematics: {
        type: String,
        required: true,
    },
    Chemistry: {
        type: String,
        required: true,
    },
    Physics: {
        type: Number,
        required: true,
    },
    Biology: {
        type: String,
        required: true,
    },
    Economic: {
        type: String,
        required: true,
    },

});



module.exports =  mongoose.model('Exam', ExamSchema);
