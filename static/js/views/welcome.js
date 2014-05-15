define(

    [ 'jquery',
      'underscore',
      'backbone',
       'extendBackbone',
      'templates/welcome',
      'css!styles/bootstrap',
      'css!styles/bootstrap-theme',
      'css!styles/app',
      'css!styles/welcome',
      'jquery.fileupload',
      'jquery.ui.widget',
      'dropdown'
    ],
    
    function( $, _, Backbone, ExtendBackbone, welcomeHtml ) {

        return Backbone.View.extend( {

            className: 'container',

            templateData: { },

            events: {

                'click div[data-js="uploadPhotoBtnWrapper"]': 'handleUploadPhotoClick',
                'click button[data-js="submitButton"]': 'submitClicked'
            },

            initialize: function( options ) {

                this.user = options;

                this.render();

                $('.dropdown-toggle').dropdown();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: welcomeHtml( this.user ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.initializeUploader();

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
                    'background-image': 'url(' + this.imageUrl + ')' } );
            },

            handleUploadPhotoClick: function() {
                this.templateData.profileImageUpload.click();
            },

            submitClicked: function() {
            }

        } );
} );
