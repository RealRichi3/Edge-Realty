const express = require("express")
const router = express.Router()

// const agent = require("../controllers/agentController")
const { searchProperties, addNewProperty,
    removeProperty, updateProperty } = require('../controllers/propertiesController')


// router.patch("/updatedata", agent.updateAgentData)
// router.get("/find", agent.getAllAgents)
router.post("/add", addNewProperty)
router.delete("/remove", removeProperty)
router.get("/find", searchProperties)
router.patch("/update", updateProperty)
// router.post("/appointment/book", agent.bookAppointment)

module.exports = router;