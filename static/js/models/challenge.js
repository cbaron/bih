define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {
    
    return Backbone.Model.extend( {

        defaults: {
            "id": undefined,
            "number": undefined,
            "title": undefined,
            "pointValue": undefined,
            "description": undefined
        }

    } );
} );
