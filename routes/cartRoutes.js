const express = require("express");
const router = express.Router();

const cart = require("../controllers/cartController");

router.post("/add", cart.addPropertyToCart);
router.post("/remove", cart.removePropertyFromCart);
router.post("get", cart.getCartItems);
router.post("/clear", cart.clearCart);
router.post("/checkout", cart.checkoutCart);

module.exports = router;
