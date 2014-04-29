define(

    [
        'jquery',
        'underscore',
        'backbone'
    ],

    function( $, _, Backbone ) {
      
        var AppRouter = Backbone.Router.extend( {

            routes: {

                'dashboard': 'dashboard',
                'index': 'index',
                '': 'index'
            },

            index: function() {
                require( [ 'views/header' ] );
                require( [ 'views/welcome' ] );
            },

            dashboard: function() {
                require( [ 'views/header' ] );
                require( [ 'views/dashboard' ] );
            },

            initialize: function() {

                $( function() {
                    Backbone.history.start( { pushState: true } );
                } );

                return this;
            }

        } );

        return new AppRouter();
    }
);
