const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// protected route
router.get('/me', protect, getMe);

module.exports = router;