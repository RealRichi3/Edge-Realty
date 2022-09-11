const express = require("express");
const router = express.Router();

const {resetClientPassword, changeOldPassword, authenticateClientLogin} = require("../controllers/utils/auth/passwordAuth")

router.post("/resetpassword", resetClientPassword);
router.post("/changepassword", changeOldPassword);
router.post('/login', authenticateClientLogin);

module.exports = router;
