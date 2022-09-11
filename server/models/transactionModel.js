const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    agent_email_fkey: { type: String, required: true, unmodifiable: true },
    user_email_fkey: { type: String, required: true , unmodifiable: true},
    property_id_fkey: { type: String, required: true , unmodifiable: true},
    transaction_type: { type: String, required: true },
    transaction_date: { type: Date, required: true },
    transaction_amount: { type: Number, required: true },
    transaction_status: { type: String, required: true },
    transaction_notes: { type: String, required: true },
    transaction_date_created: { type: Date },
    transaction_date_updated: { type: Date },
    transaction_date_deleted: { type: Date }
}, { timestamps: true });

const Transaction = mongoose.model("Transactions", transactionSchema)

module.exports = { Transaction }