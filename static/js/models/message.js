define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {
    
    return Backbone.Model.extend( {

        defaults: {
            "id": undefined,
            "from": undefined,
            "message": undefined
        }

    } );
} );
