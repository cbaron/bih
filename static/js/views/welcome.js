define(

    [ 'jquery',
      'underscore',
      'backbone',
       'extendBackbone',
      'templates/welcome',
      'views/modalSpinner',
      'css!styles/bootstrap',
      'css!styles/bootstrap-theme',
      'css!styles/app',
      'css!styles/welcome',
      'jquery.fileupload',
      'jquery.ui.widget',
      'dropdown'
    ],
    
    function( $, _, Backbone, ExtendBackbone, welcomeHtml, loading ) {

        return Backbone.View.extend( {

            className: 'container',

            templateData: { },

            events: {

                'click div[data-js="uploadPhotoBtnWrapper"]': 'handleUploadPhotoClick',
                'click ul[data-js="dropdownMenu"] li': 'dropdownClicked',
                'click button[data-js="submitButton"]': 'submitClicked',
            },

            initialize: function( options ) {

                this.user = new Backbone.Model( options );

                this.render();

                $('.dropdown-toggle').dropdown();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: welcomeHtml( this.user.attributes ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.initializeUploader();

                this.templateData.dropdownMenu.each( function() {
                    var menuEl = $(this);
                    menuEl.width( menuEl.prev().width() );
                } );

                return this;
            },

            initializeUploader: function() {
                var self = this; 
                this.templateData.profileImageUpload.fileupload( {
                    dataType: 'json',
                    done: function (e, data) {
                        self.imageUrl = data.result.files[0]['url'];
                        self.updateThumbnail();
                        self.initializeUploader();
                    }
                } );
            },

            updateThumbnail: function() {
                this.templateData.uploadPhotoBtn.empty();

                this.templateData.uploadPhotoBtn.css( {
                    'background-image': 'none',
                    'background-color': 'transparent',
                } );

                this.templateData.uploadPhotoBtnWrapper.css( {
                    'background-image': 'url(' + this.imageUrl + ')',
                    'background-size': 'cover',
                } );
            },

            handleUploadPhotoClick: function() {
                this.templateData.profileImageUpload.click();
            },

            dropdownClicked: function( e ) {
                var clicked = $( e.target );
                this.templateData[ clicked.parent().data('input') ].val( clicked.text() );
            },

            submitClicked: function() {
                var toSubmit = true,
                    data = {};

                _.each( [ 'phone', 'location', 'password' ], function( attr ) {
                    if( $.trim( this.templateData[ attr ].val() ) === '' ) {
                        toSubmit = false;
                        this.templateData[ attr ].addClass('error').on('focus', function() { $(this).removeClass('error'); } );
                    }
                }, this ); 

                if( this.templateData.password.val() !== this.templateData.repeat.val() ) {
                    this.templateData.password.addClass('error').on('focus', function() { $(this).removeClass('error'); } );
                    this.templateData.repeat.addClass('error').on('focus', function() { $(this).removeClass('error'); } );
                    toSubmit = false;
                }

                if( toSubmit ) {

                    loading.start();

                    data = _.reduce(
                        [ 'month', 'day', 'year', 'phone', 'university', 'location',
                          'password', 'graduated', 'occupation', 'biography' ],
                        
                        function( memo, attr ) {
                            memo[attr] = this.templateData[attr].val();
                            if( attr === 'biography' ) {
                                memo[attr] = this.templateData[attr].text();
                            };
                            return memo; },

                        { }, this );

                    $.ajax( {
                        url: '/register/post',
                        data: data,
                        success: function( response ) {
                            loading.stop();
                            if( response.weCool === true ) { window.location = '/'; }
                            else { alert('There was a problem'); }
                        }
                    } );
                }
            }

        } );
} );
