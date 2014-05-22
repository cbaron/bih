define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/challenge'
    ],
    
    function( $, _, Backbone, challenge ) {

        return new ( Backbone.Collection.extend( {

            url: '/challengeOption',

            model: challenge,

            initialize: function() { this.fetch(); }
        } ) )();
    }
);
