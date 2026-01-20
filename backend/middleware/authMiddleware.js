const jwt = require('jsonwebtoken');
const User = require('../models/user');
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.User = await User.findById(decoded.id).select('-password');
            next()
        }
        catch (error) {
            console.error(error);
            res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }
    }
    if (!token) {
        res.status.json({
            success: false,
            message: 'Not Authorized,no token'
        });
    }
};
const authorize = (...roles) => {
    return (res, res, next) => {
        if (!roles.includes(req.user.roles)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is unauthorized`
            });
        }
        next();
    };
};
module.exports = { protect, authorize }