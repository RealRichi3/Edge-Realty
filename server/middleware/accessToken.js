const AccessToken = require("../models/accessTokenModel").AccessToken;

async function saveAccessToken(user_email, access_token) {
    try {
        let new_token = new AccessToken({
            user_email_fkey: user_email,
            access_token: access_token,
        });
        await new_token.save();
    } catch (error) {
        console.log(error);
    }
}

async function deleteAccessToken(user_id, access_token) {
    try {
        await AccessToken.findOneAndDelete({ user_id_fkey: user_id, access_token: access_token });
    } catch (error) {
        console.log(error);
    }
}

async function verifyAccessToken(req, res, next) {
    try {
        let response = await AccessToken.findOne({ user_email_fkey: req.body.email, access_token: req.body.access_token });
        if (response) {
            next();
        } else {
            res.status(401).send({ message: "Access token is invalid" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occured" });
    }
}

module.exports = {
    saveAccessToken,
    deleteAccessToken,
    verifyAccessToken,
}