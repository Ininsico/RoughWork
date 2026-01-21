const express = require('express');
const router = express.Router();
const {
    getStudentProfile,
    createStudentProfile,
    dropCourse,
    enrollInCourse,
    getEnrolledCourses
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// All student routes are protected
router.use(protect);

router.route('/profile')
    .get(getStudentProfile)
    .post(createStudentProfile);

router.post('/enroll', enrollInCourse);

router.get('/courses', getEnrolledCourses);
router.delete('/courses/:courseid', dropCourse);

module.exports = router;