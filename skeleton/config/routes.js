const middlewares = require( './middlewares' )

module.exports = {
    '/skeletons': {
        get: {
            controller: 'skeleton:getSkeletons',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        post: {
            controller: 'skeleton:createSkeletons',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
    },

    '/skeletons/:skeleton_id': {
        get: {
            controller: 'skeleton:getSkeleton',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        put: {
            controller: 'skeleton:updateSkeleton',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        patch: {
            controller: 'skeleton:patchSkeleton',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        delete: {
            controller: 'skeleton:deleteSkeleton',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        middlewares
    }
}
