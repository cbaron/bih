define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/leaderboard',
      'views/challengeList',
      'views/busMates',
      'views/modalSpinner',
      'models/user',
      'templates/fourWeekChallenge',
      'css!styles/fourWeekChallenge'
    ],
    
    function( $, _, Backbone, leaderboard, challengeList, busMates, loading, user, template ) {

        var dashboard = Backbone.View.extend( {

            className: 'container four-week-container',

            templateData: { },

            events: function() {
                if( this.model === undefined ) { return { }; }

                return _.extend(
                    { },
                    this.eventController.leaderboard[ this.model.get('leaderboard' ) ],
                    this.eventController.challengeList[ this.model.get('challengeList' ) ] );
            },

            eventController: {

                leaderboard: {
                    leader: {
                        'click span[data-js="viewFullLeaderboardBtn"]': 'viewFullLeaderboardClicked'
                    },
                    full: {
                        'click span[data-js="viewFullLeaderboardBtn"]': 'hideFullLeaderboardClicked'
                    }
                },

                challengeList: {
                    viewPast: {
                        'click [data-js="viewPastChallengeButton"]': 'viewPastChallengeClick',
                    },
                    hidePast: {
                        'click [data-js="viewPastChallengeButton"]': 'hidePastChallengeClick',
                    }
                }
            },

            initialize: function() {

                //should just get the user on every route
                this[ ( user.has('firstName') )
                    ? 'render'
                    : 'waitForUserData' ]();

                this.model = new Backbone.Model( {
                    challengeList: 'viewPast',
                    leaderboard: 'leader' } );

                return this;
            },

            render: function() {
                var self = this;

                loading.start();

                this.rendered = {
                    challenges: false,
                    leaderboard: false,
                    busMates: false };

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
                    el: this.templateData.busMatesItemContainer,
                    mode: 'badges'
                } );

                this.listenToOnce( this.challenges, 'rendered', function() {
                    self.rendered.challenges = true;
                    self.updateBusMateHeader();
                    self.checkSpinner(); } );

                this.listenToOnce( this.leaderboard, 'rendered', function() {
                    self.rendered.leaderboard = true;
                    self.checkSpinner(); } );

                this.listenToOnce( this.busMates, 'rendered', function() {
                    self.rendered.busMates = true;
                    self.checkSpinner(); } );

                this.delegateEvents();

                return this;
            },

            checkSpinner: function() {
                console.log( this.rendered );
                if( this.rendered.challenges &&
                    this.rendered.leaderboard &&
                    this.rendered.busMates ) {

                    loading.stop();
                }
            },

            updateBusMateHeader: function() {
              
                this.templateData.busMatesHeader.text(   
                    this.challenges.challenges.at(0).attributes.week
                );
            },

            waitForUserData: function() {
                this.listenToOnce( user, 'change', this.render );
            },

            viewPastChallengeClick: function() {
                if( this.pastChallenges === undefined ) {
                    this.pastChallenges = new challengeList( {
                        el: this.templateData.pastChallengeContainer,
                        type: 'pastChallenges',
                    } );
                }
                     
                this.pastChallenges.$el.fadeIn();
                
                this.templateData.viewPastChallengeButton.text('Hide Past Challenges');
                this.model.set( 'challengeList', 'hidePast' );
                this.delegateEvents();
            },

            hidePastChallengeClick: function() {
                this.pastChallenges.$el.fadeOut();
                
                this.templateData.viewPastChallengeButton.text('View Past Challenges');
                this.model.set( 'challengeList', 'viewPast' );
                this.delegateEvents();
            },

            viewFullLeaderboardClicked: function() {
                this.model.set( 'leaderboard', 'full' );
                this.leaderboard.model.set( 'mode', 'full' );
                this.templateData.viewFullLeaderboardBtn.text('Hide Full Leaderboard');
                this.delegateEvents();
            },

            hideFullLeaderboardClicked: function() {
                this.model.set( 'leaderboard', 'leader' );
                this.leaderboard.model.set( 'mode', 'leader' );
                this.templateData.viewFullLeaderboardBtn.text('Show Full Leaderboard');
                this.delegateEvents();
            }

        } );

        return new dashboard();
} );
