const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    grade: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'F', 'I', 'W'],
        required: true
    },
    remarks: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Compound index to ensure one grade per student per course
GradeSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Grade', GradeSchema);
