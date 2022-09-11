const express = require('express')
const router = express.Router()

const { addNewAdmin, activateUserAcc, deactivateUserAcc, addNewUser, getInactiveUserAccs } = require('../controllers/adminController')

// Post login routes should require 
router.
    get('/inactiveusers', getInactiveUserAccs).
    post('/activateuser', activateUserAcc).
    post('/deactivateuser', deactivateUserAcc).
    post('/newadmin', addNewUser)

module.exports = router