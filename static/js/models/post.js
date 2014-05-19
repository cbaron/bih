define( [ 'jquery', 'underscore', 'backbone', 'models/user' ], function( $, _, Backbone, user ) {
    
    return Backbone.Model.extend( {

        initialize: function() {
            this.fetch( {
                data: {
                    challengeId: this.get('challengeId'),
                    busId: this.get('busId')
                } } );
            return this;
        },

        defaults: {
            "id": undefined,
            "challengeId": undefined,
            "busId": user.get('busId'),
            "userId": undefined,
            "url": undefined,
            "body": undefined,
            "title": undefined
        },

        urlRoot: '/post/index'

    } );
} );
