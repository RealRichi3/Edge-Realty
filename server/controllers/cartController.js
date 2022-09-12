// Utilities
const { asyncWrapper } = require('../middlewares/asyncWrapper'),
    { decodeJWT } = require('./utils/jwt');

const mongoose = require('mongoose')
// Models
const { Cart } = require("../models/cartModel."),
    { Property } = require("../models/propertyModel");
const { BadRequestError } = require('../middlewares/customError');
const { Transaction } = require('../models/transactionModel');

const addPropertyToCart = asyncWrapper(async (req, res, next) => {
    const { bearer, property_id } = req.body
    let response = await Cart.findOne({ user: bearer._id });

    if (response) {
        response.properties.push(property_id)
        await response.save();
        return res.status(200).send(response);
    }
    await Cart.create({
        user: bearer._id,
        properties: [property_id]
    })
    return res.status(200).send({message: "success"}); // Send cart object
})

const removePropertyFromCart = asyncWrapper(async (req, res, next) => {
    let response = await Cart.findOne({ user: req.body.bearer._id })
    if (!response) { throw new BadRequestError('Cart is empty') }

    response.properties.pull(req.body.property_id)
    await response.save()

    return res.status(200).send({ message: "Success" })
})

const getCartItems = asyncWrapper(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.body.bearer._id }).populate('properties')
    console.log(cart)
    res.status(200).send({ message: "success", response: cart.properties })
})

const checkout = asyncWrapper(async(req, res, next) => {
    const cart = await Cart.findOne({user: req.body.bearer._id}).populate('properties')
    const properties = cart.properties
    let total_amount = 0

    properties.forEach(property => {
        total_amount += property.specifications.price
    })

    console.log(total_amount)
    const transaction_data = {
        user: req.body.bearer._id,
        properties,
        payment_method: 'card',
        amount: total_amount,
    }
    const transaction = await Transaction.create(transaction_data)
    return res.status(200).send({message: "success", transaction: { reference: transaction.ref }})
})

const confirmCheckout = asyncWrapper(async(req, res, next) => {
    const { reference, bearer } = req.body
    if (!reference) { throw new BadRequestError('Payment reference is required') }

    const URL = `https://api.paystack.co/transaction/verify/${reference}`

    const transaction =
        await axios.get(URL, {
            headers: { 'Authorization': `Bearer ${config.PAYSTACK_SECRET_KEY}` }
        })
            .then(response => { return response.data },
                error => { return error.response })
            .catch(error => console.log(error))

    // Failed transaction
    if (!transaction.data.status) { throw new BadRequestError(transaction.data.message) } 

    // Checks if the transaction amount from payment service provider matches local record
    const existing_transaction = await Transaction.findOne({ user: bearer._id, ref: reference })
    if (existing_transaction.amount != (transaction.data.amount / 100)) {
        throw new BadRequestError('Transaction Amount does not tally with saved amount')
    }

    // Checks if user's wallet has been credited
    if (existing_transaction.status != 'success') {
        await existing_transaction.updateOne({ status: "success" })
        const user_wallet = await Wallet.findOne({ user: bearer._id })
        await user_wallet.updateOne({ balance: user_wallet.balance + transaction.data.amount / 100 })
    }

    res.status(200).send({ message: "Success" })
})

const clearCart = asyncWrapper(async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate({ user: req.body.bearer._id }, { properties: [] })
    res.status(200).send({ message: "success" })
})


module.exports = {
    addPropertyToCart,
    removePropertyFromCart,
    getCartItems,
    checkout,
    clearCart,
}