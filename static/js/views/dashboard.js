define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/leaderboard',
      'models/user',
      'collections/events',
      'templates/dashboard',
      'css!styles/dashboard'
    ],
    
    function( $, _, Backbone, leaderboard, user, events, dashboardHtml ) {

        var dashboard = Backbone.View.extend( {

            className: 'container dashboard-container',

            templateData: { },

            deferredData: undefined,

            events: {
            },

            initialize: function() {

                this[ ( user.has('firstName') && events.length )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: dashboardHtml( { user: user.attributes, events: events.toJSON() } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.leaderboard = new leaderboard( {
                    el: this.templateData.leaderboardItems,
                    mode: 'short',
                    user: user
                } );

                return this;
            },

            waitForData: function() {

                //TODO: be elegant
                var self = this;

                if( ! user.has('firstName' ) ) {
                    this.deferredData = $.Deferred();
                    this.deferredData.then( function() { self.waitForData() } );
                    this.listenToOnce( user, 'change', this.deferredData.resolve );
                    return;
                }

                if( ! events.length ) {
                    this.deferredData = $.Deferred();
                    this.deferredData.then( function() { self.waitForData() } );
                    this.listenToOnce( events, 'sync', this.deferredData.resolve );
                    return;
                }

                this.render();
            }

        } );

        return new dashboard();
} );
