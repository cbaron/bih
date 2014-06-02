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

            url: '/event/index',

            model: event,

            initialize: function() {
                this.syncd = false;
                this.fetch();
                this.on( 'sync', function() { this.syncd = true; } );
            }
        } ) )();
    }
);

