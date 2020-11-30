const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; //TODO: later
const User = require('./models/user_model');

function extractJwtFromCookie(req) {
    const token = req.cookies.access_token;
    return token
}

//This is how to CHANGE default username into email field.
passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email}, (err, user) => {
            if(err)
                return done(err)
            if(user)
                return user.comparePassword(password, done)
            return done(null, false)
        })
    })
)

passport.use(
    new JwtStrategy(
        {jwtFromRequest: extractJwtFromCookie, secretOrKey: process.env.SECRET},
        (payload, done) => {
            User.findById({_id: payload.sub}, (err, user) =>{
                if(err)
                    return done(err, false)
                if(user)
                    return done(null, user) //<---- attach a whole user into req.user
                return done(null, false)  
            })
        }
    )
)
