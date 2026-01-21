const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    coursecode: {
        type: String,
        required: [true, "Course Code is required"],
        unique: true,
        uppercase: true
    },
    coursename: {
        type: String,
        required: [true, "Course name is required"],
        trim: true
    },
    description: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    credits: {
        type: Number,
        required: [true, 'Credits are required'],
        min: 1,
        max: 4
    },
    department: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    schedule: {
        days: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }],
        starttime: String,
        endtime: String,
        room: String
    },
    semester: {
        type: String,
        required: true,
        enum: ['FALL2024', 'SPRING2024', 'SUMMER2024']
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile'
    }],
    maxStudents: {
        type: Number,
        default: 30,
        min: 5,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

CourseSchema.index({ department: 1 });
CourseSchema.index({ teacher: 1 });
CourseSchema.index({ semester: 1 });

module.exports = mongoose.model('Course', CourseSchema);