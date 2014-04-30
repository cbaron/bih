define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/message'
    ],
    
    function( $, _, Backbone, message ) {

        var messages = Backbone.Collection.extend( {
           
            url: '/message',

            model: message
        } );

        var instance = new messages();
        instance.fetch();
        return instance;
    }
);
