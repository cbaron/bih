define(

    [ 'jquery',
        'underscore',
        'backbone',
        'models/reward'
    ],

    function( $, _, Backbone, reward ) {

        var rewards = Backbone.Collection.extend( {

            url: '/reward',

            model: reward
        } );

        var instance = new rewards();
        instance.fetch();
        return instance;
    }
);
