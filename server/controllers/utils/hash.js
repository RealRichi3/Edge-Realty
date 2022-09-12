const bcrypt = require('bcrypt')


// Accepts password and returns hashed password
async function hashString(string_to_hash) {
    try {
        const salt_rounds = 10;
        let hashed_string;

        const response = await bcrypt.hash(string_to_hash, salt_rounds)
        if (response) { hashed_string = response }
        else { throw "An Error occured" }
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

// Checks if password matches saved hash value
async function confirmHash(string_to_confirm, hash, _res = null) {
    return await bcrypt.compare(string_to_confirm, hash)
        .then(response => { return response })
}

module.exports = {
    hashString,
    confirmHash
};