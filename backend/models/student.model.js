const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Name: {
        type : String,
        required : true,
        unique : true
    },
    yearOfBatch: {
        type : String,
        required : true
    },
    skills: {
        type : String,
        required : true
    },
    phone:{ 
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    collegeName: {
        type : String,
        required : true
    }
},{
    timestamps: true
});

module.exports = new mongoose.model("Student" , studentSchema);