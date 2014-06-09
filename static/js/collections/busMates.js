define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/busMate',
      'models/user'
    ],
    
    function( $, _, Backbone, busMate, user ) {

        var busMates = Backbone.Collection.extend( {

            initialize: function() {

		this.syncd = false;
                
		this.fetch( { data: { busName: user.get('busName') } } );
		this.on( 'sync', function() { this.syncd = true; } );
            },

            url: '/busMate',

            model: busMate
        } );

        return new busMates();
    }
);

