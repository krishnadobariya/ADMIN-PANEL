const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    yearFounded: {
        type: String,
        required: true
    },
    Location: {
        type: Object,
        required: true
    },
    Rating: {
        type: Number
    },
    Courses: {
        type: String,
        required: true
    },
    NoOfStudents: {
        type: Number,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("College", collegeSchema);
