require('dotenv').config();

const nodemailer = require("nodemailer"),
    config = process.env

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: config.EMAIL_HOST_ADDRESS,
        clientId: config.OAUTH_CLIENT_ID,
        clientSecret: config.OAUTH_CLIENT_SECRET,
        refreshToken: config.OAUTH_REFRESH_TOKEN,
        accessToken: config.OAUTH_ACCESS_TOKEN
    }
});

function mailOptions(email_address, subject, message) {
    return {
        from: config.EMAIL_HOST_ADDRESS,
        to: email_address,
        subject: subject,
        text: message
    };
}

function sendMail(mail_data) {
    return new Promise((resolve, reject) => {
        try {
            let user_mail_option = mailOptions(
                mail_data.email,
                mail_data.title,
                mail_data.message
            );

            // Send token and reset link to user's Email address
            transporter.sendMail(user_mail_option, (error, info) => {
                if (error) { throw error } else { resolve(info) }
            });
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
};


module.exports = {
    sendMail,
};

