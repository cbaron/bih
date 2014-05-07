define(

    [
        'jquery',
        'underscore',
        'backbone'
    ],

    function( $, _, Backbone ) {
      
        var AppRouter = Backbone.Router.extend( {

            routes: {

                'fourweekchallenge': 'fourWeekChallenge',
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

            fourWeekChallenge: function() {
                require( [ 'views/header' ] );
                this.contentContainer.empty();
                require( [ 'views/fourWeekChallenge' ] );
            },

            initialize: function() {

                this.contentContainer = $('#content');

                $( function() {
                    Backbone.history.start( { pushState: true } );
                } );

                return this;
            }

        } );

        return new AppRouter();
    }
);
