const { Entity } = require( 'easy/database' )

/**
 * @class Skeleton
 * @extends Entity
 */
class Skeleton extends Entity {
    /**
     * build - build entity the first time
     *
     * @returns {Bookshelf.Model}
     */
    build() {
        return this.database.Model.extend({
            tableName: 'skeletons'
        })
    }
}

module.exports = Skeleton
