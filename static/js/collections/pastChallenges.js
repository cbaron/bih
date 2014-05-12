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
                if( user.has('busName') ) { this.getData(); }
                else { this.listenToOnce( user, 'change', this.getData ); }
            },

            getData: function() {
                this.fetch( { data: { busName: user.get('busName') } } );
            },
           
            url: '/pastChallenge',

            model: challenge
        } ) )();
    }
);
