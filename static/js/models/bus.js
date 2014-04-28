define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {
    
    return Backbone.Model.extend( {

        defaults: {
            "id": undefined,
            "weekTotals": undefined,
            "totalPoints": undefined
        }

    } );
} );
