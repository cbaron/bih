define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/challenge',
      'models/user'
    ],
    
    function( $, _, Backbone, challenge, user ) {

        var challenges = Backbone.Collection.extend( {
           
            url: '/challenge',

            model: challenge
        } );

        var instance = new challenges();
        instance.fetch( { data: { userId: user.id } } );
        return instance;
    }
);

