"use strict";

const userRepo = require("../models/repositories/user.repo");

class UserService {
    async findByEmail(email) {
        return await userRepo.findByEmail({ email });
    }

    async findByUsername(username) {
        return await userRepo.findByUsername({ username });
    }

    async createUser({ username, name, email, password, avatar = null, dob = null, sex = null, phone = null, role = 'agent', status = 'active' }) {
        const newUser = await userRepo.createUser({ username, name, email, password, avatar, dob, sex, phone, role, status });
        return newUser;
    }
}

module.exports = new UserService();