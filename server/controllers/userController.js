const User = require("../models/userModel").User;
const { addNewClient, updateClientData } = require("./common/clientsCommonController");
const { scheduleAppointment } = require("./common/appointment");
const { newsletterSignup } = require("../models/newsletterModel");

// Add new user to db
function addNewUser(req, res) {
    let data = req.body;
    console.log("--- Request body ---");
    console.log(req.body);
    let user = new User({
        name: data.name,
        email: data.email,
        user_type: data.user_type || "regular",
        address: data.address,
    });

    addNewClient(res, "user", data, user)
};

// Update user data
function updateUserData(req, res) {
    updateClientData(res, "user", req.body)
}

async function bookAppointment(req, res) {
    try {
        let new_appointment_data = {
            agent_email_fkey: req.body.agent_email,
            user_email_fkey: req.body.user_email,
            date: req.body.date,
            time: req.body.time,
            notes: req.body.notes,
            status: "pending",
            client_type: "user"
        }
        let response = await scheduleAppointment(res, new_appointment_data)
        if ((response) && (response.length > 0)) {
            res.status(200).send(response)
        } else { throw "An error occured" }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function signupForNewsletter(req, res) {
    try {
        let response = await newsletterSignup(req.body)
        if (response) {
            res.status(200).send(response)
        } else { throw "An error occured" }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}



module.exports = {
    addNewUser,
    updateUserData,
    signupForNewsletter,
    bookAppointment
};
