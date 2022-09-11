const mongoose = require("mongoose");


async function connectDatabase(url) {
    await mongoose.connect(url);
    const db = mongoose.connection;
    console.log(`Connection to ${db.name} database Successful!`);

}

module.exports = connectDatabase