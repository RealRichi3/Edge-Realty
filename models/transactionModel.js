const mongoose = require("mongoose");
const crypto = require('crypto');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true},
    properties: [ {type: Schema.Types.ObjectId, required: true }],
    payment_method: { type: String, required: true, enum: ['cash', 'crypto', 'card', 'transfer']},
    amount: { type: Number, required: true},
    note: { type: String},
    status: { type: String, default: 'Pending'},
    ref: { type: String, default: () => {
        return crypto.randomUUID()
    }}
}, {timestamps: true})



const Transaction = mongoose.model("Transactions", transactionSchema)

module.exports = { Transaction }
