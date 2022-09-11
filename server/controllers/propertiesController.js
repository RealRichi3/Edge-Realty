
const { Property } = require("../models/propertyModel");

async function searchProperties(req, res) {
    try {
        let query = req.query;
        let properties = Property.find(query);
        properties.exec()
            .then(response => {
                res.status(200).send(response)
            })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

async function addNewPropertyListing(property_data) {
    try {
        let property = new Property(property_data);
        await property.save();
        return property;
    } catch (error) {
        console.log(error)
        return error
    }
}

async function removePropertyListing(property_id) {
    try {
        let property = await Property.findByIdAndDelete(property_id);
        return property;
    } catch (error) {
        console.log(error)
        return error
    }
}


async function updatePropertyListing(property_id, property_data) {
    try {
        let property = await Property.findByIdAndUpdate(property_id, property_data, { new: true });
        return property;
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    searchProperties,
    addNewPropertyListing,
    removePropertyListing,
    updatePropertyListing
}
