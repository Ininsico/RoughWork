const moongose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new moongose.Schema({
    name: {
        type: String,
        required: true,
        trim: ture
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/]
    },
    passwowrd: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enm: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true,
})
//pre-saved middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('passwowrd')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.passwowrd = await bcrypt.hash(this.passwowrd, salt);
        next();
    } catch (error) {
        next(error);
    }
});
//instance method:campare password
userSchema.methods.comparepassword = async function (candidatepassword) {
    return await bcrypt.compare(candidatepassword, this.passwowrd);
};
module.exports = moongose.model('User',UserSchema);