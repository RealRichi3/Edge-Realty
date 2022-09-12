const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const asyncWrapper = require('../middlewares/asyncWrapper')

const jwt = require('jsonwebtoken');
const { Status } = require('./accountStatusModel');
const { Password } = require('./passwordModel');
const { Token } = require('./tokenModel');
const config = process.env

const options = {toObject: { virtuals: true } }

const admin = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        refPath: 'role'
    },
    firstname: { type: String, required: [true, "Firstname is required"] },
    lastname: { type: String, required: [true, "Lastname is required"] },
    email: { type: String, unique: true, required: [true, "email is required"] },
    phonenumber: { type: String, required: [true, "phone number is required"] },
    address: { type: String },
    role: { type: String, required: [true, "role is required"], default: "Admin" }
}, options, { timestamp: true });

const agent = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        refPath: 'role'
    },
    firstname: { type: String, required: [true, "Firstname is required"] },
    lastname: { type: String, required: [true, "Lastname is required"] },
    email: { type: String, unique: true, required: [true, "email is required"] },
    phonenumber: { type: String, required: [true, "phone number is required"] },
    address: { type: String },
    role: { type: String, required: [true, "role is required"], default: "Agent" }
}, options, { timestamp: true });

const endUser = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        refPath: 'role'
    },
    firstname: { type: String, required: [true, "Firstname is required"] },
    lastname: { type: String, required: [true, "Lastname is required"] },
    email: { type: String, unique: true, required: [true, "email is required"] },
    phonenumber: { type: String, required: [true, "phone number is required"] },
    address: { type: String },
    role: { type: String, required: [true, "role is required"], default: "EndUser" },
    // verification_token: { type: Schema.Types.ObjectId, ref: 'VerificationToken'}
}, options, { timestamp: true });


const Agent = mongoose.model('Agent', agent),
    EndUser = mongoose.model("EndUser", endUser),
    Admin = mongoose.model('Admin', admin)


// USER SCHEMA --- start
const userSchema = new Schema({
    firstname: { type: String, required: [true, "Firstname is required"] },
    lastname: { type: String, required: [true, "Lastname is required"] },
    email: { type: String, unique: true, required: [true, "email is required"] },
    address: { type: String },
    role: { type: String, required: [true, "role is required"] }
}, { toObject: { virtuals: true } }, { timestamp: true })

// Schema Custom methods --- start
userSchema.methods.createJWT = function () {
    return jwt.sign({ _id: this._id, name: this.name, email: this.email, role: this.role }, config.JWT_SECRET, { expiresIn: config.JWT_LIFETIME })
}
userSchema.methods.completeSave = async function (data)  {
    try {
        const currUserBasedOnRole = {
            "EndUser": EndUser,
            "Agent": Agent,
            "Admin": Admin
        }
        data.user = this._id
        if (data.role == "EndUser") { data.isActive = true }

        await currUserBasedOnRole[data.role].create(data)   // Creates new document and ref in the corresponding table based on data.role
        await Password.create(data)
        await Status.create(data)
        const ver_token = await Token.create(data)

        console.log(ver_token)

        return ver_token.verification
    } catch (error) {
        throw error
    }
}
userSchema.methods.createResetToken = async function (reset_token) {
    await Token.findOneAndUpdate({ user: this._id}, { password_reset: reset_token }, { upsert: true }, function (err, doc) {
        if (err) { throw "An error occured" }
    }).clone()
    console.log({
        _id: this._id,
        reset_token,
        email: this.email,
        role: this.role
    })
    return jwt.sign({ _id: this._id, reset_token, email: this.email, role: this.role }, config.JWT_SECRET, { expiresIn: config.JWT_LIFETIME })
}
// end --- Schema Custom methods

// Mongoose Virtuals --- start
userSchema.virtual('status', {
    ref: "Status",
    localField: "_id",
    foreignField: "user",
    justOne: true
})
userSchema.virtual('token', {
    ref: "Token",
    localField: "_id",
    foreignField: "user",
    justOne: true
})
userSchema.virtual('password', {
    ref: "Password",
    localField: "_id",
    foreignField: "user",
    justOne: true
})
userSchema.virtual('fullName').
    get(function () { return `${this.firstName} ${this.lastName}`; }).
    set(function (v) {
        const firstName = v.substring(0, v.indexOf(' '));
        const lastName = v.substring(v.indexOf(' ') + 1);
        this.set({ firstName, lastName });
    });
// end --- Mongoose Virtuals

const User = mongoose.model('User', userSchema)

// end --- USER SCHEMA


module.exports = {
    User,
    Admin,
    Agent,
    EndUser
};