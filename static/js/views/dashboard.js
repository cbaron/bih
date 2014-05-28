define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/modalSpinner',
      'views/leaderboard',
      'models/user',
      'collections/events',
      'templates/dashboard',
      'css!styles/dashboard',
      'jquery.fileupload',
      'jquery.ui.widget'
    ],
    
    function( $, _, Backbone, loading, leaderboard, user, events, dashboardHtml ) {

        return new ( Backbone.View.extend( {

            className: 'container dashboard-container',

            templateData: { },

            deferredData: undefined,

            events: {

                'click div[data-js="uploadPhotoBtn"]': 'handleUploadPhotoClick',
                'click div[data-js="hundredPointButton"]': 'hundredPointClicked',
                'click [data-js="eventBtn"]': 'eventClicked'
            },

            initialize: function() {

                loading.start();

                this[ ( events.length )
                    ? 'render'
                    : 'waitForData' ]();

                this.listenTo( user, 'change:profileThumbnailUrl', this.updateThumbnail );
                return this;
            },

            render: function() {
                var self = this;

                this.slurpTemplate( {
                    template: dashboardHtml( { user: user.attributes, events: events.toJSON() } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.leaderboard = new leaderboard( {
                    el: this.templateData.leaderboardItems,
                    mode: 'short',
                    user: user
                } ).on( 'rendered', function() { loading.stop(); } );

                this.initializeUploader();

                if( user.has("profileThumbnailUrl") ) { this.updateThumbnail(); }
                    
                return this;
            },

            updateThumbnail: function() {

                this.templateData.profileImage.css( {
                    'background-image': 'none',
                    'background-color': 'transparent',
                } );

                this.templateData.profileImageWrapper.css( {
                    'background-image': 'url(' + user.get("profileThumbnailUrl") + ')' } );
            },

            initializeUploader: function() {
                var self = this; 
                this.templateData.profileImageUpload.fileupload( {
                    dataType: 'json',
                    done: function (e, data) {
                        user.set( "profileThumbnailUrl", data.result.files[0]['url'] );
                        self.initializeUploader();
                    }
                } );
            },

            waitForData: function() {
                this.listenToOnce( events, 'sync', this.render );
            },

            handleUploadPhotoClick: function() {
                this.templateData.profileImageUpload.click();
            },

            hundredPointClicked: function() {
                this.router.navigate( 'hundredpointchallenge', { trigger: true } );
            },

            eventClicked: function(e) {
                this.router.navigate( [
                    'event',
                    'detail',
                    $(e.currentTarget).closest('[data-id]').attr('data-id') ].join("/"), { trigger: true } );
            }

        } ) )();
} );
