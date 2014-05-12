define(

    [
        'jquery',
        'underscore',
        'backbone'
    ],

    function( $, _, Backbone ) {
      
        var AppRouter = Backbone.Router.extend( {

            content: $("#content"),

            routes: {

                'fourweekchallenge': 'fourWeekChallenge',
                'hundredpointchallenge': 'hundredPointChallenge',
                'dashboard': 'dashboard',
                'index': 'index',
                '': 'index'
            },

            hideContent: function() {
                this.content.children().hide();
            },

            index: function() {
                this.hideContent();
                require( [ 'views/header' ] );

                require( [ 'views/welcome' ], function( welcome ) {
                    if( welcome.$el.is(':hidden') ) { welcome.$el.fadeIn(); } } );

            },

            dashboard: function() {
                this.hideContent();
                require( [ 'views/header' ] );
                
                require( [ 'views/dashboard' ], function( dashboard ) {
                    if( dashboard.$el.is(':hidden') ) { dashboard.$el.fadeIn(); } } );
            },

            fourWeekChallenge: function() {
                this.hideContent();
                require( [ 'views/header' ] );

                require( [ 'views/fourWeekChallenge' ], function( fourWeekChallenge ) {
                    if( fourWeekChallenge.$el.is(':hidden') ) { fourWeekChallenge.$el.fadeIn(); } } );
            },

            hundredPointChallenge: function() {
                this.hideContent();
                require( [ 'views/header' ] );
                require( [ 'views/hundredPointChallenge' ], function( hundredPointChallenge ) {
                    if( hundredPointChallenge.$el.is(':hidden') ) { hundredPointChallenge.$el.fadeIn(); } } );
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
