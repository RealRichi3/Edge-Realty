const bcrypt = require('bcrypt');
const { Password } = require("../../models/passwordModel");

// Accepts password and returns hashed password
async function hashPassword(password) {
    try {
        return new Promise(async (resolve, reject) => {
            let saltRounds = 10
            await bcrypt.hash(password, saltRounds)
                .then((response) => {
                    if (response) { password = response }
                    else { throw "An error occured" }
                }, (error) => { reject(error) })
            resolve(password)
        })

    } catch (error) {
        console.log(error)
        return error
    }

}

// Checks if password matches saved hash value
async function checkHash(password, hash, _res = null) {
    return await bcrypt.compare(password, hash)
        .then(response => { return response })
}

async function saveHash(user_id, user_password) {
    return new Promise((resolve, reject) => {
        hashPassword(user_password).then(hash => {
            let new_password = new Password({
                user_id_fkey: user_id,
                password: hash,
            });
            new_password.save().then(response => {
                resolve(response);
            }, (error) => {
                reject(error);
            })
        }, (error) => {
            reject(error);
        })
    }); // Promise
}

module.exports = {
    hashPassword,
    saveHash,
    checkHash,
};