const { SuccessResponse } = require("../core/success.response");
const { createRole, createResource } = require("../services/rbac.service");

const newRole = async (req, res, next) => {
    new SuccessResponse({
        message: "Create new role successfully!",
        metadata: await createRole(req.body)
    }).send(res);
}

const newResource = async (req, res, next) => {
    new SuccessResponse({
        message: "Create new resource successfully!",
        metadata: await createResource(req.body)
    }).send(res);
}

module.exports = {
    newRole,
    newResource
}