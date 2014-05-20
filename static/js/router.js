define(

    [
        'jquery',
        'underscore',
        'backbone',
        'models/user'
    ],

    function( $, _, Backbone, user ) {
      
        var AppRouter = Backbone.Router.extend( {

            content: $("#content"),

            routes: {
                'event/detail/:id':          'event',
                'challenge/detail/:bus/:id': 'challenge',
                'fourweekchallenge':        'fourWeekChallenge',
                'hundredpointchallenge':    'hundredPointChallenge',
                'getinvolved':              'getInvolved',
                'register':                 'register',
                'dashboard':                'dashboard',
                'index':                    'dashboard',
                '':                         'dashboard'
            },

            isLoggedIn: function() {
                var self = this;

                if( user.get('isLoggedIn') ) { return true; }
                else {

                    this.listenToOnce( user, 'sync', function() {
                        if( user.get('isLoggedIn') ) { self.toDo(); }
                        else { this.showLoginDialogue(); }
                    } );

                    return false;
                }
            },

            showLoginDialogue: function() {
                require( [ 'views/modal', 'views/login' ], function( modal, login ) {
                    modal.listenToOnce( login, 'success', modal.closeDialogue );
                    modal.addContent( {
                        width: $(window).outerWidth(true) / 4,
                        content: login.$el
                    } );
                } );
            },

            hideContent: function() {
                this.content.children().hide();
                return this;
            },

            register: function() {
                this.hideContent();
                require( [ 'views/header' ] );

                require( [ 'views/welcome' ], function( welcome ) {
                    if( welcome.$el.is(':hidden') ) { welcome.$el.fadeIn(); } } );

            },

            dashboard: function() {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ] );
                    require( [ 'views/dashboard' ], function( dashboard ) {
                        if( dashboard.$el.is(':hidden') ) { dashboard.$el.fadeIn(); } } );
                }

                if( this.isLoggedIn() ) { this.toDo(); }
            },

            fourWeekChallenge: function() {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ] );
                    require( [ 'views/fourWeekChallenge' ], function( fourWeekChallenge ) {
                        if( fourWeekChallenge.$el.is(':hidden') ) { fourWeekChallenge.$el.fadeIn(); } } );
                }
                
                if( this.isLoggedIn() ) { this.toDo(); }
            },

            event: function(id) {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ] );
                    require( [ 'views/event' ], function( event ) { event.update(id); } );
                }
                if( this.isLoggedIn() ) { this.toDo(); }
            },

            challenge: function(bus,id) {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ] );
                    require( [ 'views/challenge' ], function( challenge ) { challenge.update(bus,id); } );
                }
                if( this.isLoggedIn() ) { this.toDo(); }
            },

            hundredPointChallenge: function() {
                this.hideContent();
                require( [ 'views/header' ] );
                require( [ 'views/hundredPointChallenge' ], function( hundredPointChallenge ) {
                    if( hundredPointChallenge.$el.is(':hidden') ) { hundredPointChallenge.$el.fadeIn(); } } );

                if( this.isLoggedIn() ) { this.toDo(); }
            },

            getInvolved: function() {
                this.hideContent();
                require( [ 'views/header' ] );
                require( [ 'views/getInvolved' ], function( getInvolved ) {
                    if( getInvolved.$el.is(':hidden') ) { getInvolved.$el.fadeIn(); } } );

                if( this.isLoggedIn() ) { this.toDo(); }
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
