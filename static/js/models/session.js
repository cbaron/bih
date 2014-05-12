define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {
    
    return new ( Backbone.Model.extend( {

        defaults: {
            "isLoggedIn": false
        }

    } ) )();
} );
