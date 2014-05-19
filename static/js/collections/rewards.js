define(

    [ 'jquery',
        'underscore',
        'backbone',
        'models/bus'
    ],

    function( $, _, Backbone, bus ) {

        var rewards = Backbone.Collection.extend( {

            url: '/reward',

            model: reward
        } );

        var instance = new rewards();
        instance.fetch();
        return instance;
    }
);
