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
                'mybus':                    'myBus',
                'inbox':                    'inbox',
                'register':                 'register',
                'help':                     'help',
                'dashboard':                'dashboard',
                'index':                    'dashboard',
                '':                         'dashboard'
            },

            isLoggedIn: function( opts ) {
                var self = this;

                if( user.get('isLoggedIn') ) { return true; }
                else {

                    if( opts && opts.rvOnly ) { return false; }

                    this.listenToOnce( user, 'sync', function() {
                        user.set('hasSyncd',true);
                        if( user.get('isLoggedIn') ) { self.toDo(); }
                        else { this.showLoginDialogue(); }
                    } );

                    if( user.get('hasSyncd') ) { this.showLoginDialogue(); }

                    return false;
                }
            },

            showLoginDialogue: function() {
                $('#header').height(0);
                require( [ 'views/modal', 'views/login' ], function( modal, login ) {
                    var loginView = new login();
                    modal.listenToOnce( loginView, 'success', modal.closeDialogue );
                    modal.addContent( { content: loginView.$el } )
                } );
            },

            hideContent: function() {
                $('#header').height('10%');
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
                    require( [ 'views/header' ], function( header ) {
                        if( header.$el.is(':hidden') ) { header.$el.fadeIn(); } } );
                    require( [ 'views/dashboard' ], function( dashboard ) {
                        if( dashboard.$el.is(':hidden') ) { dashboard.$el.fadeIn(); } } );
                }

                if( this.isLoggedIn() ) { this.toDo(); }
            },

            fourWeekChallenge: function() {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ], function( header ) {
                        if( header.$el.is(':hidden') ) { header.$el.fadeIn(); } } );
                    require( [ 'views/fourWeekChallenge' ], function( fourWeekChallenge ) {
                        if( fourWeekChallenge.$el.is(':hidden') ) { fourWeekChallenge.$el.fadeIn(); } } );
                }
                
                if( this.isLoggedIn() ) { this.toDo(); }
            },

            event: function(id) {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ], function( header ) {
                        if( header.$el.is(':hidden') ) { header.$el.fadeIn(); } } );
                    require( [ 'views/event' ], function( event ) { event.update(id); } );
                }
                if( this.isLoggedIn() ) { this.toDo(); }
            },

            challenge: function(bus,id) {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ], function( header ) {
                        if( header.$el.is(':hidden') ) { header.$el.fadeIn(); } } );
                    require( [ 'views/challenge' ], function( challenge ) { challenge.update(bus,id); } );
                }
                if( this.isLoggedIn() ) { this.toDo(); }
            },

            hundredPointChallenge: function() {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ], function( header ) {
                        if( header.$el.is(':hidden') ) { header.$el.fadeIn(); } } );
                    require( [ 'views/hundredPointChallenge' ], function( hundredPointChallenge ) {
                        if( hundredPointChallenge.$el.is(':hidden') ) { hundredPointChallenge.$el.fadeIn(); } } );
                }
                if( this.isLoggedIn() ) { this.toDo(); }
            },

            getInvolved: function() {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ], function( header ) {
                        if( header.$el.is(':hidden') ) { header.$el.fadeIn(); } } );
                    require( [ 'views/getInvolved' ], function( getInvolved ) {
                        if( getInvolved.$el.is(':hidden') ) { getInvolved.$el.fadeIn(); } } );
                }
                if( this.isLoggedIn() ) { this.toDo(); }
            },

            myBus: function() {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ], function( header ) {
                        if( header.$el.is(':hidden') ) { header.$el.fadeIn(); } } );
                    require( [ 'views/myBus' ], function( myBus ) {
                        if( myBus.$el.is(':hidden') ) { myBus.$el.fadeIn(); } } );
                }
                if( this.isLoggedIn() ) { this.toDo(); }
            },

            help: function() {
                var self = this;
                this.hideContent();
                require( [ 'views/header' ], function( header ) {
                    if( self.isLoggedIn( { rvOnly: true } ) ) {
                        if( header.$el.is(':hidden') ) { header.$el.fadeIn(); }
                    } else {
                        header.$el.hide();
                    }
                } );
                require( [ 'views/help' ], function( help ) {
                    if( help.$el.is(':hidden') ) { help.$el.fadeIn(); } } );
            },

            inbox: function() {
                this.toDo = function() {
                    this.hideContent();
                    require( [ 'views/header' ], function( header ) {
                        if( header.$el.is(':hidden') ) { header.$el.fadeIn(); } } );
                    
                    require( [ 'views/inbox' ], function( inbox ) {
                        if( inbox.$el.is(':hidden') ) { inbox.$el.fadeIn(); } } );
                }
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
