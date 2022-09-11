const { TempPassword } = require("../../../models/passwordModel");
const { findClientMatch } = require("../../common/clientsCommonController");
const { sendMail } = require("../emailService");
const randomToken = require("random-token");
const server_address = process.env.server_address;

const mail_message = (user_email, server_address, token) => {
    return "You requested a password reset for your JounalX account\n\n" +
        "You have been assigned a temporary password" +
        "\n" +
        "Use this temporary token together with your email address to reset your login details" +
        "\n\n" +
        "Email: " +
        user_email +
        "\n" +
        "Temporary password: " +
        token +
        "\n\n" +
        "To reset your password, visit the following link:\n" +
        server_address +
        "/templates/authentication/confirm_reset.html/" +
        "\n\n" +
        "\n\n" +
        "If you did not request a password reset, please ignore this email.\n\n" +
        "Regards,\n" +
        "JounalX team";
}

async function updateOrCreateResetToken(user_id, token, task) {
    if (task == "update") {
        return await TempPassword.findOneAndUpdate({ user_id_fkey: user_id }, { token: token }, { new: true })
            .then((_response) => { console.log("[OK] - Temp password updated successfully"); });
    }
    if (task == "create") {
        return await TempPassword.create({
            user_id_fkey: user_id,
            token: token
        }).then((_response) => { console.log("[OK] - Temp password created successfully"); });
    }
}

async function sendResetToken(client_data) {
    try {
        let token = randomToken(16), search_response = await TempPassword.findOne({ user_id_fkey: client_data._id });

        /* case 1: user has requested a password reset before - update the temp password */
        if (search_response) { await updateOrCreateResetToken(client_data._id, token, "update"); }


        /* case 2: user has not requested a password reset before - create a new temp password */
        else { await updateOrCreateResetToken(client_data._id, token, "create"); }
        let mail_data = {
            email: client_data.email,
            title: "Password Reset",
            message: mail_message(client_data.email, server_address, token)
        }
        await sendMail(mail_data);

        return "OK";
    } catch (error) {
        console.log(error);
        return "ERROR";
    }
}

async function confirmResetToken(req) {
    try {
        let user_email = req.body.email,
            token = req.body.token,
            client_data = await findClientMatch(req.body.client_type, user_email);

        if (client_data) {
            let search_response = await TempPassword.findOneAndDelete({ user_id_fkey: client_data._id, token: token });
            if (search_response) {
                return true
            } else {
                return false;
            }
        } else { throw "An error occured"; }

    } catch (error) {
        console.log(error);
        res.status(404).send({ message: error });
    }
}


module.exports = {
    sendResetToken,
    confirmResetToken,
    updateOrCreateResetToken,
}