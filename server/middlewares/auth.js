const jwt = require("jsonwebtoken");
const { asyncWrapper } = require("./asyncWrapper");
const { UnauthorizedError } = require('./customError')
const { decodeJWT } = require("../controllers/utils/jwt");

const config = process.env;

const { User } = require('../models/usersModel');

const getBearerToken = (req) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) { throw new UnauthorizedError('Authentication required') }
        const jwtToken = authHeader.split(' ')[1]
        const payload = decodeJWT(jwtToken)

        return payload
    } catch (error) {
        throw error
    }
}

const BASICAUTH = asyncWrapper(async (req, res, next) => {
    const payload = getBearerToken(req, next)
    // console.log(payload)
    req.body.bearer = payload
    // console.log(payload)
    const currUser = await User.findOne({ _id: payload._id, role: payload.role }).populate('status');
    // console.log(currUser)
    if (!currUser || !currUser.status.isActive || !currUser.status.isVerified) { throw new UnauthorizedError("Unauthorized access") }

    next()
})

const AGENTAUTH = asyncWrapper(async (req, res, next) => {
    const payload = getBearerToken(req)
    req.body.bearer = payload
    if (payload.role != 'Agent') { throw new UnauthorizedError('Unauthorized access') }
    next()
})


module.exports = {
    BASICAUTH,
    AGENTAUTH
}