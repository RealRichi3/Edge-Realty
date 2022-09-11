const express = require("express")
const router = express.Router()

const agent = require("../controllers/agentController")


router.post("/register", agent.addNewAgent)
router.patch("/updatedata", agent.updateAgentData)
router.get("/find", agent.getAllAgents)
router.post("/listing/add", agent.addListing)
router.delete("/listing/remove", agent.removeListing)
router.get("/listing/find", agent.getAllAgentListings)
router.patch("/listing/update", agent.updateListing)
router.post("/appointment/book", agent.bookAppointment)

module.exports = router;