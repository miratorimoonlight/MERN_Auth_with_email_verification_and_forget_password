const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

//Presave middleware - NOTE: if use arrow function, this becomes empty object, and we can't use isModified()
UserSchema.pre("save", function(next) {
    //If there's no change to password field (no change, no add new), call next()
    if(!this.isModified('password')){
        next()
    }

    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if(err)
            return next(err)
        this.password = hashedPassword;
        return next()
    })
})

//Custom method - if u wanna use 'this' as user document, don't use arrow function coz arrow function watch video 8 in my react document for more info

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
            return cb(err)
        if(!isMatch)
            return cb(null, false)
        return cb(null, this)
    })
}


module.exports = mongoose.model("User", UserSchema);