const roleModel = require("../role.model");
const resourceModel = require("../resource.model");
const userRepo = require("./user.repo");
const { InternalServerError } = require("../../core/error.response");


const createResource = async ({
    name = 'profile',
    slug = 'p00001',
    description = ''
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

const resourceList = async ({
    userId = '',
    limit = 30,
    offset = 0,
    search = ''
}) => {
    // check admin ? middleware func

    // get list of resource
    return await resourceModel.aggregate({
        $project: {
            _id: 0,
            name: '$name',
            slug: '$slug',
            description: '$description',
            resourceId: '$_id',
            createdAt: 1
        }
    })
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


const getRoleListOfUser = async ({
    userId = '' }) => {
    try {
        // get role of user
        const foundUser = await userRepo.findByUserId({ userId })
        const roleCodes = foundUser.role

        // get role detail
        const roles = await roleModel.aggregate(
            {
                $match: {
                    role_code: { $in: roleCodes }
                }
            },
            {
                // phan giai record
                $unwind: '$grants'
            },
            {
                $lookup: {
                    from: 'resources',
                    localField: 'grants.resource',
                    foreignField: '_id',
                    as: 'resource'
                }
            },
            {
                $unwind: '$resource'
            },
            {
                $project: {
                    role: '$name',
                    resource: '$resource.name',
                    action: '$grants.actions',
                    attributes: '$grants.attributes'
                }
            },
            {
                $unwind: '$action'
            },
            {
                $project: {
                    _id: 0,
                    role: 1,
                    resource: 1,
                    action: '$action',
                    attributes: 1,
                }
            },
        )

        return roles
    } catch (e) {
        throw new InternalServerError(e)
    }
}

module.exports = {
    createResource,
    resourceList,
    getRoleListOfUser,
    createRole
}