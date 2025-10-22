const AccessControl = require('accesscontrol');
const rbac = new AccessControl()
const { ForbiddenError } = require('../core/error.response');
const { getRoleListOfUser } = require('../models/repositories/role.repo');
const roleModel = require('../models/role.model');
const resourceModel = require('../models/resource.model');

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            rbac.setGrants(await getRoleListOfUser({ userId: req.userId }))
            const roles = req.user.roles
            let isAction = false
            for (const roleName in roles) {
                const permission = rbac.can(roleName)[action][resource]
                if (permission.granted) {
                    isAction = true
                    break
                }
            }

            if (!isAction) {
                return next(new ForbiddenError('Permission denied'))
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

const createRole = async ({
    name = 'admin',
    slug = 'a00001',
    description = '',
    grants = []
}) => {
    // check role exists
    // nre role
    return await roleModel.create({
        name: name,
        slug: slug,
        description: description,
        grants: grants
    })
}

const createResource = async ({
    name = 'profile',
    slug = 'p00001',
    description = '',
}) => {
    // 1. Check name or slug exists

    // 2. new resource
    const resource = await resourceModel.create({
        name: name,
        slug: slug,
        description: description
    })

    return resource
}

module.exports = {
    grantAccess,
    createRole,
    createResource
}
