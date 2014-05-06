define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/event',
      'models/user',
    ],
    
    function( $, _, Backbone, event, user ) {

        var events = Backbone.Collection.extend( {
           
            url: '/event',

            model: event
        } );

        var instance = new events();
        instance.fetch( {
            data: {
                userId: user.id
            }
        } );
        return instance;
    }
);

