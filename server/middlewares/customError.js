
class CustomAPIError extends Error {
    constructor(message){
        super(message)
    }
}

class BadRequestError extends CustomAPIError {
    constructor (message){
        super(message)
        this.statusCode = 400
    }
}

class UnauthorizedError extends CustomAPIError {
    constructor (message) {
        super(message) 
        this.statusCode = 401
    }
}
const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

module.exports = {
    createCustomError, 
    CustomAPIError,
    BadRequestError,
    UnauthorizedError,
}