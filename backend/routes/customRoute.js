const express = require("express");
const { createCustom, getCustomDetails2 } = require("../controllers/customizeController")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/user/custom/new").post(isAuthenticatedUser, createCustom);

router.route("/custom/details/:id").get(getCustomDetails2);

module.exports = router;