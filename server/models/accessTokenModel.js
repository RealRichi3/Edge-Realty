const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
    user_email_fkey: {
        type: String,
    },
    access_token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 33400,
    },
});

const AccessToken = mongoose.model("AccessTokens", accessTokenSchema);
module.exports = { AccessToken }