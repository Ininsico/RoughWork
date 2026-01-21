const StudentProfile = require('../models/StudentProfile');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

//@desc Create Student profile
//@route POST api/students/profile
//@access Private
const createStudentProfile = async (req, res, next) => {
    try {
        const userid = req.user.id;
        const existingProfile = await StudentProfile.findOne({ user: userid });
        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: 'Student already registered'
            });
        }

        const studentid = `CUI-ATD${Date.now().toString().slice(-6)}`;
        const profileData = {
            ...req.body,
            user: userid,
            studentid: studentid
        };

        const studentprofile = await StudentProfile.create(profileData);

        // Update user with studentProfile reference
        await User.findByIdAndUpdate(userid, {
            studentProfile: studentprofile._id
        });

        res.status(201).json({
            success: true,
            message: 'Student profile successfully registered',
            data: studentprofile
        });
    } catch (error) {
        next(error);
    }
};

//@desc Get Student Profile
//@route GET /api/students/profile
//@access Private
const getStudentProfile = async (req, res, next) => {
    try {
        const userid = req.user.id;
        const profile = await StudentProfile.findOne({ user: userid })
            .populate('user', 'name email role')
            .populate('courses', 'coursecode coursename credits')
            .populate('grades');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Student Profile not found'
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        next(error);
    }
};

//@desc Enroll in a course
//@route POST /api/students/enroll
//@access Private
const enrollInCourse = async (req, res, next) => {
    try {
        const userid = req.user.id;
        const { courseid } = req.body;

        const studentprofile = await StudentProfile.findOne({ user: userid });
        if (!studentprofile) {
            return res.status(404).json({
                success: false,
                message: 'Student profile not found'
            });
        }

        const coursedata = await Course.findById(courseid);
        if (!coursedata) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (coursedata.students.length >= coursedata.maxStudents) {
            return res.status(400).json({
                success: false,
                message: "Course is full"
            });
        }

        const existingEnrollment = await Enrollment.findOne({
            student: studentprofile._id,
            course: coursedata._id,
            status: 'enrolled'
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: "Already enrolled in this course"
            });
        }

        const enrollment = await Enrollment.create({
            student: studentprofile._id,
            course: courseid,
            status: 'enrolled'
        });

        // Update course and student profile
        coursedata.students.push(studentprofile._id);
        await coursedata.save();

        studentprofile.courses.push(courseid);
        await studentprofile.save();

        res.status(201).json({
            success: true,
            message: "Successfully enrolled in the course",
            data: enrollment
        });
    } catch (error) {
        next(error);
    }
};

//@desc Get student's enrolled courses
//@route GET /api/students/courses
//@access Private
const getEnrolledCourses = async (req, res, next) => {
    try {
        const userid = req.user.id;
        const studentprofile = await StudentProfile.findOne({ user: userid });
        if (!studentprofile) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        const enrollments = await Enrollment.find({
            student: studentprofile._id,
            status: 'enrolled'
        }).populate({
            path: 'course',
            select: 'coursecode coursename credits teacher schedule',
            populate: {
                path: 'teacher',
                select: "name email"
            }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        next(error);
    }
};

//@desc Drop a course
//@route DELETE /api/students/courses/:courseid
//@access Private
const dropCourse = async (req, res, next) => {
    try {
        const userid = req.user.id;
        const { courseid } = req.params;

        const studentprofile = await StudentProfile.findOne({ user: userid });
        if (!studentprofile) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        const enrollment = await Enrollment.findOneAndUpdate(
            { student: studentprofile._id, course: courseid, status: 'enrolled' },
            { status: 'dropped' },
            { new: true }
        );

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found or already dropped"
            });
        }

        // Remove from course students list
        await Course.findByIdAndUpdate(courseid, {
            $pull: { students: studentprofile._id }
        });

        // Remove from student profile courses list
        await StudentProfile.findByIdAndUpdate(studentprofile._id, {
            $pull: { courses: courseid }
        });

        res.status(200).json({
            success: true,
            message: "Course successfully dropped"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStudentProfile,
    createStudentProfile,
    dropCourse,
    enrollInCourse,
    getEnrolledCourses
};