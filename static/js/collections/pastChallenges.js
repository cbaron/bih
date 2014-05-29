define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/challenge',
      'models/user'
    ],
    
    function( $, _, Backbone, challenge, user ) {

        return new ( Backbone.Collection.extend( {

            initialize: function() {
                this.fetch( { data: { busName: user.get('busName') } } );
            },

            url: '/pastChallenge',

            model: challenge
        } ) )();
    }
);
