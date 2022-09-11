const mongoose = require("mongoose");
const Schema = mongoose.Schema


const adminSchema = new Schema({
    email: { type: String, required: true, unmodifiable: true },
    password: { type: String, required: true }
}, { timestamps: true });


const Admin = mongoose.model("Admins", adminSchema);

module.exports = { Admin }