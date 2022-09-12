const jwt = require('jsonwebtoken')
const {UnauthorizedError} = require('../../middlewares/customError')
const config = process.env

const decodeJWT = (jwtToken) => {
    try { return jwt.verify(jwtToken, config.JWT_SECRET) }
    catch { throw new UnauthorizedError('JWT token exired') }
}

module.exports = {
    decodeJWT
}