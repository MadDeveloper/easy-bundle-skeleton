const { Controller } = require( 'easy/core' )

/**
 * @class SkeletonController
 * @extends Controller
 */
class SkeletonController extends Controller {
    /**
     * isRequestWellParameterized - verify if request contains valid params
     *
     * @param  {Request} request
     * @returns {boolean}
     */
    isRequestWellParameterized( request ) {
        return this.verifyParams([
            { property: 'property', typeExpected: 'string' }
        ], request )
    }

    /**
     * skeletonExists - check if skeleton exists (with id)
     *
     * @param  {Request} request
     * @param  {Response} response
     * @returns  {boolean}
     */
    async skeletonExists( request, response ) {
        const em = this.getEntityManager()
        const Skeleton = em.getModel( 'skeleton/entity/skeleton' )
        const skeletonRepository = em.getRepository( 'skeleton/entity/skeleton.repository', { model: Skeleton })
            
        try {
            const skeleton = await skeletonRepository.find(  request.getRouteParameter( 'skeleton_id' ), Skeleton )

            if ( !skeleton ) {
                response.notFound()

                return false
            }

            request.store( 'skeleton', skeleton )

            return true
        } catch ( error ) {
            response.internalServerError()

            return false
        }
    }

    /**
     * getSkeletons - get all skeletons
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    async getSkeletons( request, response ) {
        const skeletonRepository = this.getEntityManager().getRepository( 'skeleton/entity/skeleton.repository', { model: 'skeleton/entity/skeleton' })
            
        try {
            const skeletons = await skeletonRepository.findAll()

            response.ok( skeletons )
        } catch ( error ) {
            response.internalServerError( error )
        }
    }

    /**
     * createSkeleton - create new skeleton
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    async createSkeleton( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            const em = this.getEntityManager()
            const Skeleton = em.getModel( 'skeleton/entity/skeleton' )

            const skeletonRepository = em.getRepository( 'skeleton/entity/skeleton.repository', { model: Skeleton })

            try {
                const skeleton = await skeletonRepository.save( new Skeleton(), request.getBody() )

                response.created( skeleton )
            } catch ( error ) {
                response.internalServerError()
            }
        } else {
            response.badRequest()
        }
    }

    /**
     * getSkeleton - get skeleton by id
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    getSkeleton( request, response ) {
        response.ok( request.retrieve( 'skeleton' ) )
    }

    /**
     * updateSkeleton - update skeleton by id
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    async updateSkeleton( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            const skeletonRepository = this.getEntityManager().getRepository( 'skeleton/entity/skeleton.repository', { model: 'skeleton/entity/skeleton' })

            try  {
                const skeleton = await skeletonRepository.save( request.retrieve( 'skeleton' ), request.getBody() )

                response.ok( skeleton )
            } catch ( error ) {
                response.internalServerError()
            }
        } else {
            response.badRequest()
        }
    }

    /**
     * deleteSkeleton - delete skeleton by id
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    async deleteSkeleton( request, response ) {
        const skeletonRepository = this.getEntityManager().getRepository( 'skeleton/entity/skeleton.repository', { model: 'skeleton/entity/skeleton' })

        try {
            await skeletonRepository.delete( request.retrieve( 'skeleton' ) )
            response.noContent()
        } catch ( error ) {
            response.internalServerError()
        }
    }
}

module.exports.SkeletonController = SkeletonController
