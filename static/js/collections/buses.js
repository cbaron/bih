define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/bus'
    ],
    
    function( $, _, Backbone, bus ) {

        var buses = Backbone.Collection.extend( {
           
            url: '/bus',

            model: bus
        } );

        var instance = new buses();
        instance.fetch();
        return instance;
    }
);

