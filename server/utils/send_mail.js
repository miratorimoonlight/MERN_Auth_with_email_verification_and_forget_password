const nodeMailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const {MAIL_SERVICE_CLIENT_ID, MAIL_SERVICE_CLIENT_SECRET, MAIL_SERVICE_REFRESH_TOKEN, SENDER_EMAIL} = process.env

const oauth2Client = new OAuth2(
    MAIL_SERVICE_CLIENT_ID,
    MAIL_SERVICE_CLIENT_SECRET,
)

//......................How did I get refresh token? GO TO Google Oauth2 playground and choose gmail .................../
async function sendEmail (email, url, emailSubject, buttonName) {
    oauth2Client.setCredentials({ refresh_token: MAIL_SERVICE_REFRESH_TOKEN })
    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodeMailer.createTransport({
        service: 'gmail',
        
        auth: {
            type: 'oauth2',
            user: SENDER_EMAIL,
            clientId: MAIL_SERVICE_CLIENT_ID,
            clientSecret: MAIL_SERVICE_CLIENT_SECRET,
            refreshToken: MAIL_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from:SENDER_EMAIL, 
        to:email, 
        subject:emailSubject,
        html:`<h1>Hi there!!!</h1>
            <button> <a href="${url}">Click here to ${buttonName} </a> </button>
        `

    }

    const result = await smtpTransport.sendMail(mailOptions)
    return result
}

module.exports = sendEmail;