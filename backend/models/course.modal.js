const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);
