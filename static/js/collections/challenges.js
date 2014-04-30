define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/challenge'
    ],
    
    function( $, _, Backbone, challenge ) {

        var challenges = Backbone.Collection.extend( {
           
            url: '/challenge',

            model: challenge
        } );

        var instance = new challenges();
        instance.fetch();
        return instance;
    }
);

