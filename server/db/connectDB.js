const {asyncWrapper} = require('../middlewares/asyncWrapper')
const mongoose = require('mongoose')

const connectToDB = asyncWrapper(async (db_URI) => {
    await mongoose.connect(db_URI)
    const db = mongoose.connection
    console.log(`Connection to ${db.name} database successful ...`)
})

module.exports = {connectToDB}