const userModel = require('../models/user.model');
const KeyTokenService = require('./keytoken.service');
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const UserService = require('./user.service');
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');


class AuthService {
    static login = async ({ username, password, refreshToken = null }) => {
        const foundUser = await UserService.findByUsername({ username });
        if (!foundUser) {
            throw new BadRequestError("Error: User not found");
        }
        const match = bcrypt.compare(password, foundUser.password);
        if (!match) {
            throw new AuthFailureError("Authentication error");
        }

        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");

        const { _id: userId } = foundUser;
        const tokens = await createTokenPair(
            { userId, username },
            publicKey,
            privateKey
        );
        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId,
        });
        console.log(foundUser);
        return {
            user: getInfoData({
                fields: ["_id", "name", "email"],
                object: foundUser,
            }),
            tokens,
        };
    };
}

module.exports = AuthService;