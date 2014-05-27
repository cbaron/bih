define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {
    
    return Backbone.Model.extend( {

        defaults: {
            "id": undefined,
            "firstName": undefined,
            "lastName": undefined,
            "profileImage": undefined
        }

    } );
} );
