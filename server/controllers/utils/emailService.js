const nodemailer = require("nodemailer");
const email_service_pass = process.env.EMAIL_SERVICE_PASS;
const email_service_address = process.env.EMAIL_SERVICE_ADDRESS;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email_service_address,
        pass: email_service_pass
    }
});

function mailOptions(email_address, subject, message) {
    return {
        from: "journalprojectjs@gmail.com",
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
                if (error) { throw error } else { console.log("Email sent: " + info.response); resolve(info) }
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

