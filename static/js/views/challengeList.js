define(

    [ 'jquery',
      'underscore',
      'backbone',
      'templates/challengeList',
      'css!styles/challengeList'
    ],
    
    function( $, _, Backbone, challengeListHtml ) {

        return Backbone.View.extend( {

            events: {
            },

            templateData: { },

            initialize: function( options ) {

                _.extend( this, {
                    user: options.user,
                    challenges: options.challenges
                } );

                this[ ( this.challenges.length )
                    ? 'render'
                    : 'waitForChallengeData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: challengeListHtml( { user: this.user, challenges: this.challenges.toJSON() } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: false
                } );

                return this;
            },

            waitForChallengeData: function() {
                this.listenToOnce( this.challenges, 'sync', this.render );
            }

        } );
} );
