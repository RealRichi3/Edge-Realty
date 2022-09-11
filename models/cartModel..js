const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, 
        ref: 'User'},
    properties: { type: Array, default: [] }
}, { timestamps: true });


const Cart = mongoose.model("Carts", cartSchema);

module.exports = { Cart };