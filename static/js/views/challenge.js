define(

    [ 'jquery',
      'underscore',
      'backbone',
      'collections/challenges',
      'templates/challenge',
      'css!styles/challenge'
    ],
    
    function( $, _, Backbone, challenges, template ) {

        return new ( Backbone.View.extend( {

            templateData: { },

            initialize: function( options ) {

                return this.render();
            },

            render: function() {

                this.slurpTemplate( { 
                    template: template(),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                return this;
            },

            renderData: function() {

                this.challenge = challenges.get( this.challengeId );

                this.templateData.challengeNumber.text( this.challenge.get('number') );
                this.templateData.challengeTitle.text(
                    this.challenge.get('name') + " (" + this.challenge.get('name') + ")" );
                this.templateData.description.text( this.challenge.get('rules') );

            },

            update: function( challengeId ) {

                this.challengeId = challengeId;

                this[ ( challenges.length )
                    ? 'renderData'
                    : 'waitForData' ]();
            },

            waitForData: function() {
                this.listenToOnce( challenges, 'sync', this.renderData );
            }

        } ) )();
    }
);
