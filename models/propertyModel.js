const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specificationsSchema = new Schema({
    price: { type: String },
    bedrooms: { type: String },
    bathrooms: { type: String },
    area: { type: String }
})

mongoose.model('Specifications', specificationsSchema)

const propertySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'
    },
    name: { type: String },
    address: { type: String },
    city: { type: String },
    images: { type: String },
    description: { type: String },
    tag: { type: String },
    specifications: specificationsSchema,
    year_built: { type: Number }
}, { timestamps: true });

const Property = mongoose.model("Properties", propertySchema);

module.exports = { Property };