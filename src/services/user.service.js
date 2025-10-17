"use strict";

const userModel = require("../models/user.model");

const findByEmail = async ({
    email,
    select = {
        username: 1,
        name: 1,
        email: 1,
        password: 2,
        salt: 2,
        sex: 1,
        phone: 1,
        avatar: 1,
        dob: 1,
        role: 2,
        status: 1,
    },
}) => {
    return await userModel.findOne({ email }).select(select).lean();
};

const findByUsername = async ({
    username,
    select = {
        username: 1,
        name: 1,
        email: 1,
        password: 2,
        salt: 2,
        sex: 1,
        phone: 1,
        avatar: 1,
        dob: 1,
        role: 2,
        status: 1,
    },
}) => {
    return await userModel.findOne({ username }).select(select).lean();
};



module.exports = {
    findByEmail,
    findByUsername
};