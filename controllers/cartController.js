// Utilities
const { asyncWrapper } = require('../middlewares/asyncWrapper'),
    { decodeJWT } = require('./utils/jwt');

const mongoose = require('mongoose')
// Models
const { Cart } = require("../models/cartModel."),
    { Property } = require("../models/propertyModel");
const { BadRequestError } = require('../middlewares/customError');

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
    return res.status(200).send(cart); // Send cart object
})

const removePropertyFromCart = asyncWrapper(async (req, res, next) => {
    let response = await Cart.findOne({ user: req.body.bearer._id })
    if (!response) { throw new BadRequestError('Cart is empty') }

    response.properties.pull(req.body.property_id)
    await response.save()

    return res.status(200).send({ message: "Success" })
})

const getCartItems = asyncWrapper(async(req, res, next) => {
    const cart = await Cart.findOne({user: req.body.bearer._id}).populate('properties')
    console.log(cart)
    res.status(200).send({message: "success", response: cart.properties })
})

async function checkoutCart(req, res) {
    // try {
    //     let cart_items = await getCartItems(null, null, req.body.email),
    //         total_amount = 0;
    //     for (let property in cart_items) { total_amount += property.specifications.price };
    //     let transaction = new Transaction({
    //         agent_email_fkey: property.agent_email,
    //         user_email_fkey: req.body.email,
    //         properties: cart_items,
    //         total_amount: total_amount,
    //         payment_method: req.body.payment_method,
    //         payment_status: "pending",
    //         transaction_status: "pending",
    //     })
    //     transaction.save()
    //         .then(response => {
    //             res.status(200).send(response)
    //         })
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).send(error)
    // }
}

async function clearCart(res, res) {
    try {
        let response = await Cart.findOneAndDelete({ user_email_fkey: req.body.email });
        if (response) { res.status(200).send(response) }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


module.exports = {
    addPropertyToCart,
    removePropertyFromCart,
    getCartItems,
    checkoutCart,
    clearCart,
}