define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/busMates',
      'collections/challenges',
      'models/post',
      'templates/challenge',
      'css!styles/challenge'
    ],
    
    function( $, _, Backbone, busMates, challenges, post, template ) {

        return new ( Backbone.View.extend( {

            className: 'challenge-page',

            templateData: { },

            events: {
               'click  button[data-js="submitBtn"]': 'submitClicked',
            },

            initialize: function( options ) {

                return this.render();
            },

            render: function() {

                this.slurpTemplate( { 
                    template: template(),
                    insertion: { $el: this.$el.appendTo($('#content')), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.undelegateEvents();

                return this;
            },

            renderData: function() {

                this.challenge = challenges.get( this.challengeId );

                this.templateData.challengeNumber.text( this.challenge.get('number') );
                this.templateData.challengeTitle.text(
                    this.challenge.get('name') + " (" + this.challenge.get('name') + ")" );
                this.templateData.description.text( this.challenge.get('rules') );

                if( this.$el.is(':hidden') ) {
                    this.$el.fadeIn();
                }

                if( this.challenge.get('type') === 'Text' ) {
                } else if( this.challenge.get('type') === 'Video' ) {
                    this.templateData.video.addClass('enabled');
                    this.templateData.mediaReference
                        .prop( 'contenteditable', true )
                        .text( 'Paste your youtube link here' );

                }

                if( this.busMates === undefined ) {
                    
                    this.busMates = new busMates( {
                        el: this.templateData.busMatesContainer,
                        mode: 'detail',
                        challengeId: this.challengeId
                    } );
                } else {
                    this.busMates.update( this.challengeId );
                }
            },

            update: function( busId, challengeId ) {
                this.challengeId = challengeId;

                this.post = new post( { challengeId: challengeId } );

                this.listenToOnce( this.post, 'sync', this.receivedPost );
                
                this[ ( challenges.length )
                    ? 'renderData'
                    : 'waitForData' ]();

                if( this.$el.is(':hidden') ) {
                    this.$el.fadeIn();
                }
            },

            receivedPost: function() {

                if( this.post.has('body') ) {
                    this.templateData.text.val( this.post.get('body' ) );
                }

                this.delegateEvents();
            },

            waitForData: function() {
                this.listenToOnce( challenges, 'sync', this.renderData );
            },

            submitClicked: function() {
                var self = this;

                if( this.challenge.get('type') === 'Text' &&
                    $.trim( this.templateData.text.val() )  !== '' ) {

                    this.post.set( 'body', this.templateData.text.val() ).save(
                        this.post.attributes,
                        { success: function() { self.goToFourWeekChallenge() } } ); 

                } else if( this.challenge.get('type') === 'Video' &&
                    $.trim( this.templateData.mediaReference.text().indexOf( 'youtube' > -1 ) ) ) {
                    
                    this.post.set( {
                        'body': this.templateData.text.val(),
                        'url': this.templateData.mediaReference.text() } ).save(
                            this.post.attributes,
                            { success: function() { self.goToFourWeekChallenge() } } ); 
                }
            },

            goToFourWeekChallenge: function() {
                this.router.navigate( 'fourweekchallenge', { trigger: true } );
            }


        } ) )();
    }
);
