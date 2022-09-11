const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agentSchema = new Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unmodifiable: true },
        profile_picture: { type: String },
        description: { type: String },
        contact: {
            linkedln: { type: String },
            facebook: { type: String },
            instagram: { type: String },
            twitter: { type: String },
            phone: { type: String },
        },
        signup_type: { type: String }
    },
    { timestamps: true });

const Agent = mongoose.model("Agents", agentSchema);


module.exports = { Agent };