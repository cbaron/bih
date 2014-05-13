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

                if( user.has('busName') ) { this.getData(); }
                else { this.listenToOnce( user, 'change', this.getData ); }
            },

            getData: function() {
                this.fetch( { data: { busName: user.get('busName') } } );
            },
           
            url: '/busMate',

            model: busMate
        } );

        return new busMates();
    }
);

