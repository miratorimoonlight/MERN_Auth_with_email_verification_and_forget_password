const Router = require('express').Router();
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
require('../passport_config');
const sendEmail = require('../utils/send_mail');


//............To sign JWT token before sending in cookie to Client.........//
function createAccessToken(userID) {
    return jwt.sign({
        iss: 'moonServer',
        sub: userID
    }, process.env.SECRET, {expiresIn:'1h'})
}

//............Activation Token should be allowed to access once only and should be signed with different secret.........//
function createActivationToken(userID) {
    return jwt.sign({
        id: userID
    }, process.env.ACTIVATION_SECRET, {expiresIn: '5m'})
}

function createResetToken(userID) {
    return jwt.sign({
        id: userID
    }, process.env.RESET_SECRET, {expiresIn: '5m'})
}

//............Send Email Verification Link........//
async function sendVerificationLink(email, activationToken) {
    const url = `${process.env.CLIENT_URL}/user/activate/${activationToken}`;
    const result = await sendEmail(email, url, 'Verifiy Your Account Here!!!', 'Verify account');

    return result;
}


Router.post("/register", async(req, res) => {
    try{
        const {email, password, role} = req.body;
        const user = await User.findOne({email});

        if(user)
            return res.status(400).json({msg: "User already exist", error: true})

        const newUser = new User({ email, password, role });
        const savedUser = await newUser.save();

        if(savedUser) {
            const activationToken = createActivationToken(savedUser._id);
            const access_token = createAccessToken(savedUser._id);

            sendVerificationLink(email, activationToken);

            res.cookie("access_token", access_token, {maxAge:3600*1000, httpOnly: true, sameSite: true})
            return res.status(200).json({ isAuthenticated: true, user: {email, role}, error: false })
        }
        
    }
    catch(err) {
        return res.status(500).json({msg: err.message, error: true})
    }

})


Router.post("/login", passport.authenticate('local', {session: false}), (req, res) => {
    const {id, email, role, isVerified} = req.user;  //<------- req.user is provided by passport after authentication
    const token = createAccessToken(id);

    res.cookie("access_token", token, {maxAge:3600*1000, httpOnly: true, sameSite: true});
    
    if (isVerified)
        return res.status(200).json({ isAuthenticated: true, isVerified, user: {email, role} });

    return res.status(200).json({ isAuthenticated: true, user: {email, role} });
})


//.............Admin and normal user can access.............//
Router.get("/protectedData", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {isVerified} = req.user;

    if(isVerified)
        return res.status(200).json({data: "Protected data...hehehe"})
    
    return res.status(403).json({data: "", msg: "account not verified"})
})


//.............only Admin can access.............//
Router.get("/admin/protectedData", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {isVerified, role} = req.user;

    if(isVerified) {
        if(role === "admin")
            return res.status(200).json({data: "Admin Protected data...hehehe"})

        return res.status(403).json({data: ""})
    }
    else 
        return res.status(403).json({data: "", msg: "account not verified"})
})


//.............Check auth status everytime front-end app refreshes.............//
Router.get("/authenticated", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {email, role, isVerified} = req.user;

    //.........Includes isVerified field if user's account is already activated...........//
    if(isVerified)
        return res.status(200).json({ isAuthenticated: true, isVerified , user: {email, role} });

    return res.status(200).json({ isAuthenticated: true , user: {email, role} });
})


//........Activate Account/Verify User's Email..............//
//........Unauthenticated user can also access this API because only through Email that they can come here......//
Router.post("/activateAcc", async (req, res) => {
    try {
        const {activationToken} = req.body;
        const payload = jwt.verify(activationToken, process.env.ACTIVATION_SECRET)
        const user = await User.findById(payload.id);
        
        if(user) {
            if(user.isVerified)
                return res.status(400).json({msg: "User already verified", error: true});
            
            user.isVerified = true;
        }
            
        
        const updatedUser = await user.save();
        if(updatedUser){
            return res.status(200).json({ success: true })
        }
    }
    catch(err) {
        return res.status(500).json({success: false, msg: err.message})
    }
})


//...........Only authenticated (but unverified) can access this API...........//
Router.post("/sendNewVerificationLink", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const { _id, email } = req.user;
        const activationToken = createActivationToken(_id);

        const result = await sendVerificationLink(email, activationToken);

        if (result)
            return res.status(200).json({success: true, msg:"Sent new link"});
        
    }
    catch(err) {
        return res.status(500).json({success: false, msg:"Cannot send new link"});
    }
})


//...........Forgot Password Related..............//
Router.post("/forgotPassword", async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        
        if(!user)
            return res.status(400).json({success: false, msg: "User with this Email does not exist"})
        
        const resetToken = createResetToken(user.id);
        const url = `${process.env.CLIENT_URL}/user/resetPassword/${resetToken}`;

        //.........sendEmail(email, url, email_subject, button_name)..........//
        const result = await sendEmail(email, url, 'Reset Your Password Here!!!', 'Reset your password');
        if(result)
            return res.status(200).json({success: true, msg: "Reset Password sent...Check your email"})
    }
    catch (err) {
        return res.status(500).json({success: false, msg: err.message})
    }
    
})


Router.post("/resetPassword", async (req, res) => {
    try{
        const {password, resetToken} = req.body;
        const payload = jwt.verify(resetToken, process.env.RESET_SECRET);

        //........bcrypt in pre save hook does not work with findOneAndUpdate, that's why I hash here........//
        const hashedPassword = bcrypt.hashSync(password, 10)

        //......."new: true" will return the newly updated user document. without it, it'll return the before-update one......//
        const user = await User.findOneAndUpdate({_id: payload.id}, {password: hashedPassword}, {new: true});
        
        if(user)
            return res.status(200).json({success: true, msg: "Password is reset..."})
    }
    catch(err) {
        return res.status(500).json({success: false, msg: err.message})
    }
})


Router.get("/logout", (req, res) => {
    res.clearCookie("access_token");
    return res.status(200).json({ success: true, user: {email:"", role: ""} })
})



module.exports = Router;