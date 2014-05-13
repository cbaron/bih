define(

    [
        'jquery',
        'underscore',
        'backbone',
        'models/session'
    ],

    function( $, _, Backbone, session ) {
      
        var AppRouter = Backbone.Router.extend( {

            content: $("#content"),

            routes: {
                'challenge/index/:id':  'challenge',
                'fourweekchallenge':    'fourWeekChallenge',
                'hundredpointchallenge': 'hundredPointChallenge',
                'register':             'register',
                'dashboard':            'dashboard',
                'index':                'dashboard',
                '':                     'dashboard'
            },

            isLoggedIn: function() {
                var self = this;

                if( session.get('isLoggedIn') ) { return true; }
                else {

                    require( [ 'models/user'], function( user ) {
                        self.listenToOnce( session, 'changed', this.go );
                        self.listenToOnce( user, 'sync', function() {
                            if( user.has('id') ) { session.set( 'isLoggedIn', true ); }
                            else { this.showLoginDialogue(); }
                        } );
                    } );

                    return false;
                }
            },

            go: function() {
                if( session.get('isLoggedIn') ) { this.toDo(); }
            },

            showLoginDialogue: function() {
                require( [ 'views/modal', 'views/login' ], function( modal, login ) {
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
                this.toDo();
                //if( this.isLoggedIn() ) { this.toDo(); }
            },

            fourWeekChallenge: function() {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ] );
                    require( [ 'views/fourWeekChallenge' ], function( fourWeekChallenge ) {
                        if( fourWeekChallenge.$el.is(':hidden') ) { fourWeekChallenge.$el.fadeIn(); } } );
                }
                this.toDo();
                //if( this.isLoggedIn() ) { this.toDo(); }
            },

            challenge: function(id) {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ] );
                    require( [ 'views/challenge' ], function( challenge ) { challenge.update(id); } );
                }
                this.toDo();
                //if( this.isLoggedIn() ) { this.toDo(); }
            },

            hundredPointChallenge: function() {
                this.toDo = function() {
                    this.hideContent();
                    require([ 'views/header' ]);
                    require([ 'views/hundredPointChallenge' ], function (hundredPointChallenge) {
                        if (hundredPointChallenge.$el.is(':hidden')) {
                            hundredPointChallenge.$el.fadeIn();
                        }
                    });
                }
                this.toDo();
                //if( this.isLoggedIn() ) { this.toDo(); }
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
