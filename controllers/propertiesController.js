
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const { Property } = require("../models/propertyModel");
const { statusCode } = require("./utils/statusCode");



const searchProperties = asyncWrapper(async (req, res, next) => {
    console.log(req.body)
    const properties = await Property.find(req.body.query);
    return res.status(statusCode.OK).send({ message: "Success", response: properties })
})

const addNewProperty = asyncWrapper(async (req, res, next) => {
    const newProperty = await Property.create(req.body)
    
    return res.status(statusCode.OK).send({message: "Success", response: newProperty})
})

const removeProperty = asyncWrapper(async (req, res, next) => {
    const property = await Property.findByIdAndDelete(req.body._id);
    return res.status(statusCode.OK).send({ message: "Success", response: property })
})

const updateProperty = asyncWrapper(async (req, res, next) => {
    const property = await Property.findByIdAndUpdate(req.body._id, req.body.property, { new: true })
    return res.status(statusCode.OK).send({ message: "Success", response: property })
})


module.exports = {
    searchProperties,
    addNewProperty,
    removeProperty,
    updateProperty
}
