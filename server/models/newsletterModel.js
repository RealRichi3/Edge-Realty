const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsLetterSignupSchema = new Schema({
    email: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const NewsLetterSignup = mongoose.model("NewsLetterSignup", newsLetterSignupSchema);

module.exports = { NewsLetterSignup };