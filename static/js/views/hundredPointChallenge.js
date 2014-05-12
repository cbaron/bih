/**
 * Created by tonybaron on 5/8/14.
 */
define(

    [ 'jquery',
        'underscore',
        'backbone',
        'views/leaderboard',
        'views/challengeList',
        'models/user',
        'collections/buses',
        'collections/challenges',
        'templates/hundredPointChallenge',
        'css!styles/hundredPointChallenge'
    ],

    function( $, _, Backbone, leaderboard, challengeList, user, buses, challenges, template ) {

        var dashboard = Backbone.View.extend( {

            className: 'container hundred-point-container',

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
                    template: template( { user: user.attributes } ),
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
                    el: this.templateData.challengeContainer,
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