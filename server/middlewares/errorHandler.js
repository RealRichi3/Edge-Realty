const {CustomAPIError, createCustomError} = require("./customError")
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;
const ValidatorError  = mongoose.Error.ValidatorError;

const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).send({message: err.message})
    }
    if (err instanceof ValidationError) {
        return res.status(401).send({message: err.message})
    }
    if (err instanceof ValidatorError) {
        return res.status(401).send({message: err.message})
    }
    return res.status(500).send({ message: "An error occured" }) 
}


module.exports = {errorHandler}