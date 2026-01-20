const User = require("../models/user");
const jwt = require('jsonwebtoken');

const generatetoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

//@docs register user
//@route POST api/auth/register
//@access Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userexsit = await User.findOne({ email });
        if (userexsit) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'User already exsists'
                }
            );
        }
        const user = await User.create({
            name, email, password
        });
        const token = generatetoken(user._id);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
}

//@docs Login user
//@route POST /api/user/login
//@access public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'The user is not registered,Login first'
            });
        }
        //check password
        const ismatch = await User.comparepassword(password);
        if (!ismatch) {
            return res.status(401).json({
                success: false,
                message: "Password not matching"
            });
        }
        const token = generatetoken(user._id);
        res.status(200).json({
            success: true,
            token,
            user: {
                token,
                name: user.name,
                id: user.id,
                email: user.username,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
}

//@desc Get current user
//@route GET api/user/me
//@access private

const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        next(err);
    }
}
module.exports={
    registerUser,
    loginUser,
    getMe
}