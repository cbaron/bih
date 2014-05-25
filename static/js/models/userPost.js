define( [ 'backbone' ], function( Backbone ) {
    
    return Backbone.Model.extend( {

        defaults: {
            "id": undefined,
            "challengeId": undefined,
            "userId": undefined,
            "url": undefined,
            "body": undefined,
            "title": undefined
        }

    } );
} );
