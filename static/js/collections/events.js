define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/event'
    ],
    
    function( $, _, Backbone, event ) {

        var events = Backbone.Collection.extend( {
           
            url: '/event',

            model: event
        } );

        var instance = new events();
        instance.fetch();
        return events;
    }
);

