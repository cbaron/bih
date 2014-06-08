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
    
    function( $, _, Backbone, leaderboard, challengeList, busMates, spinner, user, template ) {

        return new ( Backbone.View.extend( {

            className: 'container four-week-container',

            events: function() {
                if( this.model === undefined ) { return { }; }

                return _.extend(
                    { },
                    { 'click span[data-js="viewFullLeaderboardBtn"]': 'viewFullLeaderboardClicked' },
                    this.eventController.challengeList[ this.model.get('challengeList' ) ] );
            },

            eventController: {

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

                this.templateData = { };

                this.model = new Backbone.Model( {
                    challengeList: 'viewPast',
                    leaderboard: 'leader' } );
                
                this.render();

                return this;
            },

            render: function() {
                var self = this;

                this.spinner = new spinner().start();

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

                //oh boy
                if( this.busMates.rendered ) {
                    this.rendered.busMates = true;
                    this.checkSpinner();
                } else {
                    this.busMates.on( 'rendered', function() {
                        self.rendered.busMates = true;
                        self.checkSpinner();
                    } );
                }

                if( this.leaderboard.rendered ) {
                    this.rendered.leaderboard = true;
                    this.checkSpinner();
                } else {
                    this.leaderboard.on( 'rendered', function() {
                        self.rendered.leaderboard = true;
                        self.checkSpinner();
                    } );
                }

                if( this.challenges.rendered ) {
                    this.rendered.challenges = true;
                    this.updateBusMateHeader();
                    this.checkSpinner();
                } else {
                    this.challenges.on( 'rendered', function() {
                        self.rendered.challenges = true;
                        self.updateBusMateHeader();
                        self.checkSpinner();
                    } );
                }
                
                this.delegateEvents();

                return this;
            },

            checkSpinner: function() {

                if( this.rendered.challenges &&
                    this.rendered.leaderboard &&
                    this.rendered.busMates ) {

                    this.spinner.stop();
                }
            },

            updateBusMateHeader: function() {
            
                //I've failed you mom and dad. 
                if( this.challenges.challenges.length !== 0 ) {
                    this.templateData.busMatesHeader.text(   
                        this.challenges.challenges.at(0).attributes.week
                    );
                }
            },

            viewPastChallengeClick: function() {
                var self = this,
                    reducer =
                        function( memo, model ) {
                            if( memo[ model.week ] ) {
                                model.number = memo[ model.week ].length + 1;
                                memo[ model.week ].push(model);
                            } else {
                                model.number = 1;
                                memo[ model.week ] = [model];
                            }
                            return memo; },
                    viewCreator =
                        function( collection ) {
                            var view = new challengeList( {
                                el: self.templateData.pastChallengeContainer,
                                collection: collection } );
                            self.pastChallenges.push( view );
                            };
                        

                if( this.pastChallenges === undefined ) {

                    this.pastChallenges = [ ];

                    require( [ 'collections/pastChallenges' ], function( challenges ) {

                        if( challenges.length ) {
                            _.each( challenges.weekData, viewCreator );
                                
                            $('html,body').scrollTop(
                                self.templateData.pastChallengeContainer.offset().top - 50 );

                        } else {
                        
                            self.spinner = new spinner().start();

                            challenges.on( 'syncd', function() {
                                _.each( challenges.weekData, viewCreator );

                                self.spinner.stop();
                                $('html,body').scrollTop(
                                    self.templateData.pastChallengeContainer.offset().top - 50 );
                            } );
                         }
        
                        return;
                    } );

                } else {
                    _.each( this.pastChallenges, function( view ) {
                        view.$el.fadeIn();
                    } );
                }
                
                this.templateData.viewPastChallengeButton.text('Hide Past Challenges');
                this.model.set( 'challengeList', 'hidePast' );
                this.delegateEvents();
            },

            hidePastChallengeClick: function() {
                _.each( this.pastChallenges, function( view ) {
                    view.$el.fadeOut();
                } );
                
                this.templateData.viewPastChallengeButton.text('View Past Challenges');
                this.model.set( 'challengeList', 'viewPast' );
                this.delegateEvents();

                $('html,body').scrollTop(
                    this.templateData.pastChallengeContainer.offset().top - 50 );
            },

            viewFullLeaderboardClicked: function() {
                if( this.model.get('leaderboard') === 'leader' ) {
                    this.model.set( 'leaderboard', 'full' );
                    this.leaderboard.model.set( 'mode', 'full' );
                    this.templateData.viewFullLeaderboardBtn.text('Hide Full Leaderboard');
                } else {
                    this.model.set( 'leaderboard', 'leader' );
                    this.leaderboard.model.set( 'mode', 'leader' );
                    this.templateData.viewFullLeaderboardBtn.text('Show Full Leaderboard');
                }
            }

        } ) )();

} );
