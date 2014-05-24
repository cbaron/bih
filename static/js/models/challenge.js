define( [ 'backbone' ], function( Backbone ) {
    
    return Backbone.Model.extend( {

        defaults: {
            "id": undefined,
            "number": undefined,
            "type": undefined,
            "name": undefined,
            "rules": undefined,
            "week": undefined,
            "points": undefined,
            "imageUrl": undefined,
            "idx": undefined
        }

    } );
} );
