define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/challenge',
      'models/user'
    ],
    
    function( $, _, Backbone, challenge, user ) {

        var reducer = function( memo, model ) {
            if( memo[ model.week ] ) {
                model.number = memo[ model.week ].length + 1;
                memo[ model.week ].add(model);
            } else {
                model.number = 1;
                memo[ model.week ] = new Backbone.Collection( [ model ] );
            }
            return memo; },
            challenges = new ( Backbone.Collection.extend( {

                initialize: function() {
                    this.fetch( { data: { busName: user.get('busName') } } );
                    this.weekData = { };
                },

                url: '/pastChallenge',

                model: challenge
            } ) )();
            
            challenges.on( 'sync', function() {
                this.weekData = _.reduce( challenges.toJSON(), reducer, { } );
                this.trigger('syncd');
            } );
        
        return challenges
    }
);
