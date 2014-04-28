define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/leaderboard',
      'models/user',
      'collections/buses',
      'templates/dashboard',
      'css!styles/dashboard'
    ],
    
    function( $, _, Backbone, leaderboard, user, buses, dashboardHtml ) {

        var dashboard = Backbone.View.extend( {

            className: 'container dashboard-container',

            templateData: { },

            events: {
            },

            initialize: function() {

                this[ ( user.has('firstName') )
                    ? 'render'
                    : 'waitForUserData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: dashboardHtml( { user: user.attributes } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.leaderboard = new leaderboard( {
                    el: this.templateData.leaderboardItems,
                    user: user,
                    buses: buses
                } );

                return this;
            },

            waitForUserData: function() {
                this.listenToOnce( user, 'change', this.render );
            }

        } );

        return new dashboard();
} );
