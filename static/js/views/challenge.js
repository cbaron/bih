define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/busMates',
      'views/modalSpinner',
      'collections/challenges',
      'models/post',
      'templates/challenge',
      'css!styles/challenge',
      'jquery.fileupload'
    ],
    
    function( $, _, Backbone, busMates, spinner, challenges, post, template ) {

        return new ( Backbone.View.extend( {

            className: 'challenge-page',

            events: {
               'click  button[data-js="submitBtn"]': 'submitClicked',
               'click  [data-js="image"]': 'imageIconClicked',
               'click  [data-js="backBtn"]': 'backClicked'
            },

            initialize: function( options ) {

                this.templateData = { };

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
                var self = this;

                this.challenge = challenges.get( this.challengeId );

                if( this.challenge ) {
                    this.type = 'active';
                    this.reallyRender();
                } else {
                    this.type = 'past';
                    require( [ 'collections/pastChallenges' ], function( pastChallenges ) {
                        if( pastChallenges.length ) { 
                            self.challenge = pastChallenges.get( self.challengeId );
                            self.reallyRender();
                        } else {
                            pastChallenges.on('sync', function() {
                                self.challenge = pastChallenges.get( self.challengeId );
                                self.reallyRender();
                            } );
                            if( ! self.spinnerStarted ) {
                                self.spinner = new spinner().start();
                                self.spinnerStarted = true;
                            }
                        }
                    } );
                }
            },

            //oh
            reallyRender: function() {

                this.post = new post( { challengeId: this.challengeId } );
                this.listenToOnce( this.post, 'sync', this.receivedPost );

                if( this.type === 'past' ) {
                    this.templateData.submission.hide();
                } else {
                    this.templateData.submission.show();
                }

                this.templateData.challengeNumber.text( this.challenge.get('number') );

                this.templateData.challengeTitle.text(
                    this.challenge.get('name') + " (" + this.challenge.get('points') + " pt)" );

                this.templateData.description.text( this.challenge.get('rules') );

                if( this.$el.is(':hidden') ) {
                    this.$el.fadeIn();
                }

                if( this.challenge.get('type') === 'Text' ) {
                } else if( this.challenge.get('type') === 'Image' ) {
                    this.initializeUploader();
                    this.templateData.image.addClass('enabled');
                } else if( this.challenge.get('type') === 'Video' ) {
                    this.templateData.video.addClass('enabled');
                    this.templateData.mediaReference
                        .prop( 'contenteditable', true )
                        .text( 'Paste your youtube link here' );
                }

                if( this.spinnerStarted ) {
                    this.spinnerStarted = false;
                    this.spinner.stop();
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

            resetInputs: function() {
                this.templateData.text.val('');
                this.templateData.mediaReference.text('');
                this.templateData.video.removeClass('enabled');
                this.templateData.image.removeClass('enabled');
                this.templateData.mediaReference
                    .prop( 'contenteditable', false );
            },

            update: function( busId, challengeId ) {
                this.resetInputs();

                this.challengeId = challengeId;

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

                if( this.challenge.get('type') === 'Image' ) {
                    if( this.post.has('url') ) {
                        this.templateData.mediaReference.text(
                            window.location.origin + this.post.get('url')
                        );
                    }
                }

                if( this.challenge.get('type') === 'Video' ) {

                    if( this.post.has('url') ) {
                        this.templateData.mediaReference.text( this.post.get('url') );
                    }
                }

                this.delegateEvents();
            },

            waitForData: function() {
                this.spinner = new spinner().start();
                this.spinnerStarted = true;
                this.listenToOnce( challenges, 'sync', this.renderData );
            },

            submitClicked: function() {
                var self = this;

                if( this.challenge.get('type') === 'Text' &&
                    $.trim( this.templateData.text.val() )  !== '' ) {

                    this.spinner = new spinner().start();

                    this.post.set( 'body', this.templateData.text.val() ).save(
                        this.post.attributes,
                        { complete: function() { self.spinner.stop(); self.goToFourWeekChallenge() } } ); 

                } else if( this.challenge.get('type') === 'Image' &&
                           this.templateData.mediaReference.text() !== '' ) {
               
                    this.spinner = new spinner().start();

                    this.post.set( 'body', this.templateData.text.val() ).save(
                        this.post.attributes,
                        { complete: function() { self.spinner.stop(); self.goToFourWeekChallenge() } } ); 
                     
                } else if( this.challenge.get('type') === 'Video' &&
                    $.trim( this.templateData.mediaReference.text().indexOf( 'youtube' > -1 ) ) ) {
                    
                    this.spinner = new spinner().start();

                    this.post.set( {
                        'body': this.templateData.text.val(),
                        'url': this.templateData.mediaReference.text() } ).save(
                            this.post.attributes,
                            { success: function() { self.spinner.stop(); self.goToFourWeekChallenge() } } ); 
                }
            },

            goToFourWeekChallenge: function() {
                this.router.navigate( 'fourweekchallenge', { trigger: true } );
            },

            initializeUploader: function() {
                var self = this; 
                this.templateData.imageUpload.fileupload( {
                    dataType: 'json',
                    done: function (e, data) {
                        self.post.set( "url", data.result.files[0]['url'] );
                        self.templateData.mediaReference.text( data.result.files[0]['name'] );
                        self.initializeUploader();
                    }
                } );
            },

            imageIconClicked: function() {
                if( this.challenge.get('type') === 'Image' ) {
                    this.templateData.imageUpload.click();
                }
            },

            backClicked: function() { this.goToFourWeekChallenge(); },

        } ) )();
    }
);
