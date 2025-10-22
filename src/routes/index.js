"use strict";
const express = require("express");
const router = express.Router();

router.use("/v1/api/auth", require("./auth"));
router.use("/v1/api/rbac", require("./rbac"));
module.exports = router;