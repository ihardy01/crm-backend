"use strict";

const { SuccessResponse } = require("../core/success.response");
const AuthService = require("../services/auth.service");

class AuthController {
    login = async (req, res, next) => {
        new SuccessResponse({
            message: "Login successfully",
            metadata: await AuthService.login(req.body),
        }).send(res);
    };
}

module.exports = new AuthController();