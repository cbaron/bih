define(

    [ 'jquery',
      'backbone',
      'models/challenge',
      'models/enroll'
    ],
    
    function( $, Backbone, challenge, enroll ) {

        return new ( Backbone.Collection.extend( {

            initialize: function() { this.fetch(); return this; },

            url: '/hundredChallenge/index/' + enroll.get('challengeId'),

            model: challenge
        } ) )();
    }
);
