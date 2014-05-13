define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/leaderboard',
      'views/challengeList',
      'views/busMates',
      'models/user',
      'templates/fourWeekChallenge',
      'css!styles/fourWeekChallenge'
    ],
    
    function( $, _, Backbone, leaderboard, challengeList, busMates, user, template ) {

        var dashboard = Backbone.View.extend( {

            className: 'container four-week-container',

            templateData: { },

            events: {
                'click *[data-js="viewPastChallengeButton"]': 'handleViewPastChallengeClick'
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
                    template: template( { user: user.attributes } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.leaderboard = new leaderboard( {
                    el: this.templateData.leaderboardItems,
                    mode: 'leader',
                    user: user
                } );
                
                this.challenges = new challengeList( {
                    el: this.templateData.challengeContainer
                } );
                
                this.busMates = new busMates( {
                    el: this.templateData.busMatesItemContainer
                } );

                return this;
            },

            waitForUserData: function() {
                this.listenToOnce( user, 'change', this.render );
            },

            handleViewPastChallengeClick: function() {

                this.pastChallenges = new challengeList( {
                    el: this.templateData.pastChallengeContainer,
                    type: 'pastChallenges',
                } ).$el.fadeIn();
            }

        } );

        return new dashboard();
} );
