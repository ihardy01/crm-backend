const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Resource';
const COLLECTION_NAME = 'resources';

const modelSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, modelSchema);
