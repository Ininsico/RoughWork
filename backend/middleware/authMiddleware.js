const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized, no token'
        });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user ? req.user.role : 'unknown'} is unauthorized`
            });
        }
        next();
    };
};

module.exports = { protect, authorize };