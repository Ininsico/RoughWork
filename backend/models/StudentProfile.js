const mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    studentid: {
        type: String,
        unique: true,
        required: [true, 'Student Id is required']
    },
    dateofBirth: {
        type: Date,
        required: [true, 'Date of Birth is required']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    guardian: {
        name: String,
        relationship: String,
        phone: String
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'graduated'],
        default: 'active'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    grades: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grade'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('StudentProfile', StudentProfileSchema);