define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/event',
      'models/user',
    ],
    
    function( $, _, Backbone, event, user ) {

        return new ( Backbone.Collection.extend( {

            defaults: {
                imageUrl: undefined,
                name: undefined,
                datetime: undefined
            },

            url: '/event',

            model: event,

            initialize: function() { this.fetch(); }
        } ) )();
    }
);

