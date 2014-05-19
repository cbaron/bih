define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {
    
    return Backbone.Model.extend( {

        defaults: {
            "id": undefined,
            "name": undefined,
            "description": undefined,
            "datetime": undefined,
            "imageUrl": undefined
        }

    } );
} );
