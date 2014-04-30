define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/leaderboard',
      'models/user',
      'collections/buses',
      'collections/challenges',
      'templates/dashboard',
      'css!styles/dashboard'
    ],
    
    function( $, _, Backbone, leaderboard, user, buses, dashboardHtml ) {

        var dashboard = Backbone.View.extend( {

            className: 'container four-week-container',

            templateData: { },

            events: {
            },

            initialize: function() {

                //should just get the user on every route
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
                    mode: 'leader',
                    user: user,
                    buses: buses
                } );

                this.challenges = new challengeList( {
                    el: this.templateData.challengeItems,
                    user: user,
                    challenges: challenges
                } );

                return this;
            },

            waitForUserData: function() {
                this.listenToOnce( user, 'change', this.render );
            }

        } );

        return new dashboard();
} );
