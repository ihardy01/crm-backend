const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    sex: { type: String, default: null },
    phone: { type: String, default: null },
    avatar: { type: String, default: null },
    dob: { type: Date, default: null },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] },
}, {
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, userSchema);
