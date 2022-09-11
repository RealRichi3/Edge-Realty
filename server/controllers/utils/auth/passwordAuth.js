// const User = require("../models/userModel").User;
const { Password, } = require("../../../models/passwordModel"),
    { hashPassword, checkHash } = require("../hash.js"),
    { findClientMatch } = require("../../common/clientsCommonController"),
    { saveAccessToken } = require("../../../middleware/accessToken"),
    { sendResetToken, confirmResetToken } = require("./resetToken"),
    randomToken = require("random-token");

const User = require("../../../models/userModel").User,
    Agent = require("../../../models/agentModel").Agent,
    Admin = require("../../../models/adminModel").Admin;

const clients = {
    "user": User,
    "agent": Agent,
    "admin": Admin
}
let clientModel;


/* Require: client_type, client_data, client_id */
async function authenticateClientLogin(req, res) {
    try {
        clientModel = clients[req.body.client_type];
        let search_response = await clientModel.findOne({ email: req.body.email })
        if (search_response) {
            let response = await checkPassword(search_response._id, req.body.password);
            if (response) {
                let access_token = randomToken(16);
                saveAccessToken(req.body.email, access_token);
                res.status(200).send({ message: "User Logged in successfully", access_token: access_token });
            } if (response == false) { throw "User password incorrect" }

        } else {
            throw "User not found"
        }

    } catch (error) {
        console.log(error)
        res.status(404).send({
            message: "User does not exist",
        });
    }
}

/* Resolves true or false if password matches saved hash value */
function checkPassword(user_id, user_password) {
    return new Promise(async (resolve, reject) => {
        try {
            let search_result = await Password.findOne({ user_id_fkey: user_id })
            if (search_result) {
                search_result = await checkHash(user_password, search_result.password)
                resolve(search_result);
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

async function resetClientPassword(req, res) {
    try {
        let client_data = await findClientMatch(req.body.client_type, req.body.email)
        console.log(client_data)
        if (client_data) {
            let reset_response = await sendResetToken(client_data);
            if (reset_response == "OK") {
                res.status(200).send({ message: "Reset token sent to user's email" });
            } else {
                res.status(404).send({ message: "User does not exist" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occured" });
    }
}

async function changeOldPassword(req, res) {
    try {
        let response = await confirmResetToken(req);
        if (response) {
            let client_data = await findClientMatch(req.body.client_type, req.body.email);
            if (client_data) {
                let hash = await hashPassword(req.body.new_password)
                if (hash) {
                    await Password.findOne({ user_id_fkey: client_data._id }).then((response) => { }, (error) => { console.log(error) })
                    await Password.findOneAndUpdate({ user_id_fkey: client_data._id }, { password: hash }, { upsert: false })
                    await Password.findOne({ user_id_fkey: client_data._id }).then((response) => { })
                    res.status(200).send({ message: "Password changed successfully" });
                }
            } else { throw "An error occured" }
        } else { res.status(400).send({ message: "Invalid Reset token" }) }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occured" });
    }
}


module.exports = {
    authenticateClientLogin,
    resetClientPassword,
    changeOldPassword
}