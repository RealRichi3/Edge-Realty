
const Agent = require("../models/agentModel").Agent;
const { Property } = require("../models/propertyModel"),
    { Transaction } = require("../models/transactionModel");
const { addNewPropertyListing, updatePropertyListing, removePropertyListing } = require("./propertiesController");
const { addNewClient, updateClientData } = require("./common/clientsCommonController");
const { authenticateClientLogin } = require("./utils/auth/passwordAuth")
const { scheduleAppointment } = require("./common/appointment");

async function loginAgent(req, res) {
    console.log(req.body)
    authenticateClientLogin(res, "agent", req.body)
}

// Add new Agent to db
async function addNewAgent(req, res) {
    let data = req.body;
    let agent = new Agent({
        name: data.name,
        email: data.email,
        Agent_type: data.signup_type || "regular",
        address: data.address,
    });

    addNewClient(res, "agent", data, agent)
};

// Update Agent data
async function updateAgentData(req, res) {
    console.log('updating agent data')
    updateClientData(res, "agent", req.body)
}

async function getAllAgents(req, res) {
    try {
        console.log('afinf')
        let response = await Agent.find()
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "An error occured" })
    }
}

async function showTransactionHistory(req, res) {
    try {
        Transaction.find({ agent_id: req.body.agent_id })
            .then(response => {
                res.status(200).send(response)
            })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function addListing(req, res) {
    try {
        let new_listing_data = {
            agent_email_fkey: req.body.agent_email,
            name: req.body.name,
            address: req.body.address,
            images: req.body.images,
            description: req.body.description,
            specifications: {
                price: req.body.specifications.price,
                bedrooms: req.body.specifications.bedrooms,
                bathrooms: req.body.specifications.bathrooms,
                area: req.body.specifications.area
            },
            year_built: req.body.year_built
        }
        let new_listing = await addNewPropertyListing(new_listing_data)
        if (new_listing) {
            res.status(200).send(new_listing)
        } else { throw "An error occured" }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function removeListing(req, res) {
    try {
        let property = await removePropertyListing(req.body._id)
        
        if (property) {
            res.status(200).send(property)
        } else { throw "An error occured" }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function updateListing(req, res) {
    try {
        let property = await updatePropertyListing(req.body._id, req.body)
        if (property) {
            res.status(200).send(property)
        } else { throw "An error occured" }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function getAllAgentListings(req, res) {
    try {
        console.log('afinf')
        let response = await Agent.find({agent_email_fkey: req.body.agent_email_fkey})
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "An error occured" })
    }
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
            client_type: "agent"
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


module.exports = {
    addNewAgent,
    updateAgentData,
    getAllAgents,
    loginAgent,
    showTransactionHistory,
    bookAppointment,
    addListing,
    removeListing,
    updateListing,
    getAllAgentListings
};
