const userModel = require("../user.model");

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
        password: 0,
        salt: 0,
        sex: 1,
        phone: 1,
        avatar: 1,
        dob: 1,
        role: 0,
        status: 1,
    },
}) => {
    return await userModel.findOne({ username }).select(select).lean();
};

const findByUserId = async ({ userId, select = {} }) => {
    return await userModel.findById(userId).select(select).lean();
};


const createUser = async (userData) => {
    const newUser = await userModel.create(userData);
    return newUser;
}

module.exports = {
    findByEmail,
    findByUsername,
    findByUserId,
    createUser,
}