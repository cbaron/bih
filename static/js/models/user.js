define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {
    
    var userModel = Backbone.Model.extend( {

        defaults: {

            "id": undefined,
            "firstName": undefined,
            "lastName": undefined,
            "emailAddress": undefined,
            "photoUrl": undefined,
            "birthday": undefined,
            "phoneNumber": undefined,
            "busId": undefined,
            "busName": undefined

        },

        urlRoot: '/user/index'

    } );

    return new userModel();
} );
