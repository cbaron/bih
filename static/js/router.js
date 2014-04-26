define(

    [
        'jquery',
        'underscore',
        'backbone'
    ],

    function( $, _, Backbone ) {
      
        var AppRouter = Backbone.Router.extend( {

            routes: {

                //'music': 'musicRoute',

                'index': 'index',

                '': 'index'
            },

            /*
            musicRoute: function() {

                this.toggleHomeButtonView();
                this.toggleMusicView( { load: true } );
                this.loadDomainText();
            },
            */

            index: function() {
                
                require( [ 'views/header' ] );

                require( [ 'views/welcome' ] );
            }

        } );

        var initialize = function() {

            $( function() {
        
                var appRouter = new AppRouter();

                Backbone.history.start( { pushState: true, root: "/bih/" } );
            } );

        };

        return { initialize: initialize } 
    }
);
