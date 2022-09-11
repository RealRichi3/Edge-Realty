// const saveNewPassword = require("./passwordController.js").savePassword;
const saveNewPassword = require("../utils/hash").saveHash;

const User = require("../../models/userModel").User,
    Agent = require("../../models/agentModel").Agent,
    Admin = require("../../models/adminModel").Admin;

const clients = {
    "user": User,
    "agent": Agent,
    "admin": Admin
}
let clientModel;

/* Require: client_type, client_email;
   Returns: client_data in DB | false */
async function findClientMatch(client_type, client_email) {
    try {
        clientModel = clients[client_type];
        return await clientModel.findOne({ email: client_email })
            .then((response) => { return response }).catch((error) => { throw error })
    } catch (error) {
        console.log(error);
        return false
    }
}

/* Require: http_response_obj client_type, client_data, client_model */
async function addNewClient(res, client_type, client_data, client) {
    try {
        let match = await findClientMatch(client_type, client_data.email);

        if (match) {
            res.status(400).send({ message: "User already exists" });
        } else {
            let temp_id;
            let saved_details = await client.save();
            saveNewPassword(saved_details._id, client_data.password)
                .then((response) => {
                    temp_id = response._id;
                    res.status(200).send({ message: "User added succesfully" });
                }, (error) => { throw error });
        }
    } catch (error) {
        await client.findOneAndDelete({ email: client_data.email })
        console.log(error);
        res.status(400).send({ message: "An error occured" });
    }
}

/* Require: http_response_obj, client_type, client_data */
async function updateClientData(res, client_type, client_data, client = null) {
    try {
        clientModel = clients[client_type];
        clientModel.findOneAndUpdate({ email: client_data.email }, client_data)
            .then((response) => {
                if (response) {
                    res.status(200).send({ message: "User Data updated successfully" })
                } else {
                    res.status(404).send({
                        message: "User does not exist",
                    });
                }
            })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "An error occured" });
    }
}

async function bookAppointment(req, res) { }

async function showTransactionHistory(req, res) { }

async function reportAgent(req, res) { }

module.exports = {
    addNewClient,
    findClientMatch,
    updateClientData,
}