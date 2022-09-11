const express = require("express");
const router = express.Router();

const cart = require("../controllers/cartController");

router.
    get("/", cart.getCartItems).
    post("/add", cart.addPropertyToCart).
    post("/remove", cart.removePropertyFromCart).
    post("/clear", cart.clearCart).
    post("/checkout", cart.checkout);

module.exports = router;
