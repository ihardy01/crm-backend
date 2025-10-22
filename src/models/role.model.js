const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Role';
const COLLECTION_NAME = 'roles';

const modelSchema = new Schema({
    name: { type: String, default: '' },
    slug: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] },
    description: { type: String, default: '' },
    grants: [
        {
            resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
            actions: [{ type: String, required: true }],
            attributes: { type: String, default: '*' }
        }
    ]
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, modelSchema);
