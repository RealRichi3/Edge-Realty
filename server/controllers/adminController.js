const { User } = require("../models/userModel"),
    { Agent } = require("../models/agentModel"),
    { Password } = require("../models/passwordModel"),
    { Appointment } = require("../models/appointmentModel"),
    { Cart } = require("../models/cartModel"),
    { Transaction } = require("../models/transactionModel"),
    { Property } = require("../models/propertyModel"),
    { Cart } = require("../models/cartModel.");

const { findClientMatch } = require("../controllers/common/clientsCommonController");

const clients = {
    "user": User,
    "agent": Agent
}

async function deleteUser(req, res) {
    try {
        let client_id;
        let client_data = await findClientMatch(req.body.client_type, req.body.email)
        if (client_data) { client_id = client_data._id };

        await User.findOneAndDelete({ email: req.body.client_email });
        await Password.findOneAndDelete({ user_id_fkey: client_id });
        await Appointment.findOneAndDelete({ user_email_fkey: req.body.client_email });
        await Cart.findOneAndDelete({ user_email_fkey: req.body.client_email });

        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function deleteAgent(req, res) {
    try {
        let client_id;
        let client_data = await findClientMatch(req.body.client_type, req.body.email)
        if (client_data) { client_id = client_data._id };

        await Agent.findOneAndDelete({ email: req.body.client_email });
        await Password.findOneAndDelete({ agent_id_fkey: client_id });
        await Appointment.findOneAndDelete({ agent_email_fkey: req.body.client_email });
        await Cart.findOneAndDelete({ agent_email_fkey: req.body.client_email });
        await Transaction.findOneAndDelete({ agent_email_fkey: req.body.client_email });
        await Property.findOneAndDelete({ agent_email_fkey: req.body.client_email });

        res.status(200).send({ message: "Agent deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function getClientTransactionHistory(req, res) {
    try {
        let client_id, transaction_history;
        let client_data = await findClientMatch(req.body.client_type, req.body.email)
        if (client_data) { client_id = client_data._id };

        if (req.body.client_type == "user") { let transaction_history = await Transaction.find({ user_email_fkey: req.body.client_email }); }
        if (req.body.client_type == "agent") { let transaction_history = await Transaction.find({ agent_email_fkey: req.body.client_email }); }

        res.status(200).send({ transaction_history });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function getAgentPropertyListingHistory(req, res) {
    try {
        let client_id;
        let client_data = await findClientMatch(req.body.client_type, req.body.email)
        if (client_data) { client_id = client_data._id };

        let property_history = await Property.find({ agent_email_fkey: req.body.client_email });

        res.status(200).send({ property_history });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function getClientAppointmentHistory(req, res) {
    try {
        let client_id;
        let client_data = await findClientMatch(req.body.client_type, req.body.email)
        if (client_data) { client_id = client_data._id };

        if (req.body.client_type == "user") { let appointment_history = await Appointment.find({ user_email_fkey: req.body.client_email }); }
        if (req.body.client_type == "agent") { let appointment_history = await Appointment.find({ agent_email_fkey: req.body.client_email }); }

        res.status(200).send({ appointment_history });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


module.exports = {
    deleteUser,
    deleteAgent,
    getClientTransactionHistory,
    getAgentPropertyListingHistory,
}