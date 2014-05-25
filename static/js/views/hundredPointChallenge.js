/**
 * Created by tonybaron on 5/8/14.
 * HueHue'd by Chris Baron on 5/20/14
 */
define(
    [
      'jquery',
      'underscore',
      'backbone',
      'models/enroll',
      'models/user',
      'jquery.fileupload'
    ],

    function( $, _, Backbone, enroll, user ) {

        return new ( Backbone.View.extend( {

            className: 'hundred-point-container',

            templateData: { },

            events: {
                'click button[data-js="selectBtn"]': 'selectClicked',
                'click button[data-js="submitBtn"]': 'submitClicked',
                'click div[data-js="categoryHeader"]': 'categoryClicked',
                'click div[data-js="challengeList"] div[data-category]': 'challengeClicked',
                'click [data-js="resize"]': 'resizeClicked'
            },

            initialize: function() {

                this[ ( enroll.has('challengeId') )
                    ? 'waitForData'
                    : 'waitForEnrollData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: this.template( this.templateInput ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                return this;
            },

            optionController: function() {
                this.templateInput = { data: this.options.toJSON() };
                this.render();
            },

            challengeController: function() {
                var categories = [],
                    categoryClass = '',
                    width,
                    self = this;

                categories = _.uniq( _.pluck( this.challenges.toJSON(), 'category' ) );
                
                categoryClass = 'col-md-' + Math.floor( 12 / categories.length );
                
                categories = _.map( categories, function(category) {
                        if( ! category ) { category = 'null'; } return { name: category, class: categoryClass }; } );

                this.templateInput = {
                    data: this.challenges.toJSON(),
                    userPoints: user.get('points'),
                    categories: categories
                };

                this.render();

                if( user.get('points') > 100 ) { width = '100'; }
                else if( user.get('points') < 1 ) { width = '0'; }
                else { width = user.get('points'); }

                this.templateData.pointBar.width( width + '%' );

                $(this.templateData.categoryHeader[0]).click();

                require( [ 'models/post' ], function( post ) {
                    self.post = post;
                    self.posts = new Backbone.Collection();
                } );
                   
            },

            categoryClicked: function( e ) {

                var clickedEl = $(e.currentTarget);

                this.templateData.categoryHeader.removeClass('selected');
                clickedEl.addClass('selected');

                this.templateData.challengeList.find('[data-category]').addClass('hide');

                this.templateData.challengeList.find(
                    'div[data-category="' +
                    clickedEl.text() +
                    '"]').removeClass('hide');
            },

            waitForEnrollData: function() {
                this.listenToOnce( enroll, 'sync', this.waitForData );
            },

            waitForData: function() {
                var self = this;

                if( enroll.get('challengeId') ) {
                    require(
                        [ 'collections/hundredChallenge',
                          'templates/hundredChallenges',
                          'css!styles/hundredChallenges' ],
                             
                        function( challenges, template ) {
                            self.challenges = challenges;
                            self.template = template;
                            if( challenges.length ) { this.challengeController(); }
                            else { self.listenToOnce( challenges, 'sync', self.challengeController ); }
                        }
                    );
                } else {
                    require(
                        [ 'collections/challengeOption',
                          'templates/challengeOptions',
                          'css!styles/challengeOptions' ],
                               
                        function( options, template ) {
                            self.options = options;
                            self.template = template;
                            if( options.length ) { this.optionController(); }
                            else { self.listenToOnce( options, 'sync', self.optionController ); }
                            
                        }
                    );
                }
            },

            selectClicked: function(e) {
                enroll.set('challengeId', $(e.currentTarget).data('id') ).save();
            },

            challengeClicked: function(e) {

                var self = this,
                    challengeId = $(e.currentTarget).data('js'),
                    submissionContainer = this.templateData[ challengeId ].find('[data-js="submissionContainer"]'),
                    post;

                if( submissionContainer.hasClass('hide') ) {
                    this.templateData[ challengeId ].addClass('active');
                    submissionContainer.fadeIn().removeClass('hide');
                    this.templateData[ challengeId ].find('[data-js="resize"]').fadeIn().removeClass('hide');

                    if( ! this.templateData[challengeId].data('init') ) {

                        if( this.challenges.get(challengeId).get('type') === 'Text' ) {
                        } else if( this.challenges.get(challengeId).get('type') === 'Image' ) {
                            this.initializeUploader(challengeId);
                            this.templateData[challengeId].find('[data-js="image"]')
                                .addClass('enabled')
                                .on( 'click', function() { self.templateData[challengeId].find('[data-js="imageUpload"]').click(); } );
                        } else if( this.challenges.get(challengeId).get('type') === 'Video' ) {
                            this.templateData[challengeId].find('[data-js="video"]').addClass('enabled');
                            this.templateData.mediaReference
                                .prop( 'contenteditable', true )
                                .text( 'Paste your youtube link here' );
                        }

                        if( this.posts.where( { challengeId: challengeId } ).length === 0 ) {
                            post = this.posts.add ( new this.post( { challengeId: challengeId } ) );
                            this.listenToOnce( post, 'sync', function() { self.displayPostInformation(challengeId); } );
                        }

                        this.templateData[challengeId].data('init',true);
                    }
                }
            },

            initializeUploader: function(challengeId) {
                var self = this; 
                this.templateData[challengeId].find('[data-js="imageUpload"]').fileupload( {
                    dataType: 'json',
                    done: function (e, data) {
                        self.posts.findWhere( { challengeId: challengeId } )
                            .set( "url", data.result.files[0]['url'] );
                        self.templateData[challengeId].find('[data-js="mediaReference"]')
                            .text( data.result.files[0]['name'] );
                        self.initializeUploader(challengeId);
                    }
                } );
            },

            resizeClicked: function(e) {
                $(e.currentTarget)
                    .addClass('hide')
                    .closest('div[data-category]')
                        .removeClass('active')
                        .find('[data-js="submissionContainer"]').fadeOut().addClass('hide');

                e.stopImmediatePropagation();
            },

            displayPostInformation: function(challengeId) {

                var submissionContainer =
                    this.templateData[ challengeId ].find('[data-js="submissionContainer"]'),
                    post = this.posts.findWhere( { challengeId: challengeId }),
                    challenge = this.challenges.get(challengeId);
                
                if( post && post.has('body') ) {
                    submissionContainer.find('[data-js="submittedBody"]').text( post.get('body') );
                }

                if( challenge.get('type') === 'Image' ||
                    challenge.get('type') === 'Video' ) {
                    if( post && post.has('url') ) {
                        submissionContainer.find('[data-js="mediaReference"]').text(
                            post.get('url')
                        );
                    }
                }
            },

            submitClicked: function(e) {

                var clickedBtn = $(e.currentTarget);
                    challengeId = clickedBtn
                        .closest('div[data-category]').data('js'),
                    textEl = clickedBtn
                        .closest('div[data-js="submissionContainer"]').find('[data-js="text"]'),
                    mediaReference = clickedBtn
                        .closest('div[data-js="submissionContainer"]').find('[data-js="mediaReference"]'),
                    challenge = this.challenges.get(challengeId),
                    post = this.posts.findWhere( { challengeId: challengeId } ),
                    self = this;

                if( challenge.get('type') === 'Text' &&
                    $.trim( textEl.val() )  !== '' ) {

                    post.set( 'body', textEl.val() ).save(
                        post.attributes,
                        { success: function() { self.displayPostInformation(challengeId); } } ); 

                } else if( challenge.get('type') === 'Image' &&
                           mediaReference.text() !== '' ) {
               
                    post.set( 'body', textEl.val() ).save(
                        post.attributes,
                        { success: function() { self.displayPostInformation(challengeId); } } ); 
                     
                } else if( challenge.get('type') === 'Video' &&
                    $.trim( mediaReference.text().indexOf( 'youtube' > -1 ) ) ) {
                    
                    post.set( {
                        'body': textEl.val(),
                        'url': mediaReference.text() } ).save(
                            post.attributes,
                            { success: function() { self.displayPostInformation(challengeId); } } ); 
                }

                e.stopImmediatePropagation();
            }


        } ) )();
    } );
