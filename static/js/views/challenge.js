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
    
    function( $, _, Backbone, busMates, loading, challenges, post, template ) {

        return new ( Backbone.View.extend( {

            className: 'challenge-page',

            templateData: { },

            events: {
               'click  button[data-js="submitBtn"]': 'submitClicked',
               'click  [data-js="image"]': 'imageIconClicked',
               'click  [data-js="backBtn"]': 'backClicked'
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
                } else if( this.challenge.get('type') === 'Image' ) {
                    this.initializeUploader();
                    this.templateData.image.addClass('enabled');
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

            resetInputs: function() {
                this.templateData.text.val('');
                this.templateData.mediaReference.text('');
            },

            update: function( busId, challengeId ) {
                this.resetInputs();

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

                if( this.challenge.get('type') === 'Image' ||
                    this.challenge.get('type') === 'Video' ) {
                    if( this.post.has('url') ) {
                        this.templateData.mediaReference.text( this.post.get('url') );
                    }
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

                    loading.start();

                    this.post.set( 'body', this.templateData.text.val() ).save(
                        this.post.attributes,
                        { success: function() { loading.stop(); self.goToFourWeekChallenge() } } ); 

                } else if( this.challenge.get('type') === 'Image' &&
                           this.templateData.mediaReference.text() !== '' ) {
               
                    loading.start();

                    this.post.save(
                        this.post.attributes,
                        { success: function() { loading.stop(); self.goToFourWeekChallenge() } } ); 
                     
                } else if( this.challenge.get('type') === 'Video' &&
                    $.trim( this.templateData.mediaReference.text().indexOf( 'youtube' > -1 ) ) ) {
                    
                    loading.start();

                    this.post.set( {
                        'body': this.templateData.text.val(),
                        'url': this.templateData.mediaReference.text() } ).save(
                            this.post.attributes,
                            { success: function() { loading.stop(); self.goToFourWeekChallenge() } } ); 
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
