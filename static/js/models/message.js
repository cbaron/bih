define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {
    
    return Backbone.Model.extend( {

        defaults: {
            "id": undefined,
            "fromName": undefined,
            "subject": undefined,
            "body": undefined,
            "sent": undefined
        }

    } );
} );
