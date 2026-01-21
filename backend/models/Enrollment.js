const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrolledDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['enrolled', 'dropped', 'completed'],
        default: 'enrolled'
    },
    grade: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'F', 'I', 'W', null],
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);