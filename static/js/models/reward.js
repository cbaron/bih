define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {

    return Backbone.Model.extend( {

        defaults: {
            "id": undefined,
            "rank": undefined,
            "name": undefined,
            "description": undefined
        }

    } );
} );
