const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");
const cart = require("../controllers/cartController");
const { searchProperties } = require("../controllers/propertiesController");

router.post("/register", user.addNewUser);
router.patch("/updatedata", user.updateUserData);
router.post("/cart/add", cart.addPropertyToCart);
router.post("/cart/remove", cart.removePropertyFromCart);
router.post("/cart/get", cart.getCartItems);
router.post("/cart/clear", cart.clearCart);
router.post("/cart/checkout", cart.checkoutCart);
router.post("/search", searchProperties);
router.post("/newsletter", user.signupForNewsletter);



module.exports = router;
