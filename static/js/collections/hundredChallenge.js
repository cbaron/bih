define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/challenge',
      'models/enroll'
    ],
    
    function( $, _, Backbone, challenge, enroll ) {

        return new ( Backbone.Collection.extend( {

            initialize: function() { this.fetch(); return this; },

            parse: function( response ) {

                return _.map( response, function( challenge ) {
                    if( ! challenge.category ) {
                        challenge.category = 'bad data';
                    }
                    
                    return challenge;
                } );
            },

            url: '/hundredChallenge/index/' + enroll.get('challengeId'),

            model: challenge

        } ) )();
    }
);
