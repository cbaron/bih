define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {
    
    return new ( Backbone.Model.extend( {

        initialize: function() {
            this.fetch();
            return this;
        },

        defaults: {

            "id": undefined,
            "firstName": undefined,
            "lastName": undefined,
            "emailAddress": undefined,
            "photoUrl": undefined,
            "birthday": undefined,
            "phoneNumber": undefined,
            "busId": undefined,
            "busName": undefined,
            "profileImageUrl": undefined,
            "points": undefined,
            "isLoggedIn": false,

        },

        urlRoot: '/user'

    } ) )();
} );
