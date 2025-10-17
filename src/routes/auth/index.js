"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const authController = require("../../controllers/auth.controller");
const router = express.Router();

router.post("/login", asyncHandler(authController.login));

module.exports = router;