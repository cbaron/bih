define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/leaderboard',
      'models/user',
      'collections/events',
      'templates/dashboard',
      'css!styles/dashboard',
      'jquery.fileupload',
      'jquery.ui.widget'
    ],
    
    function( $, _, Backbone, leaderboard, user, events, dashboardHtml ) {

        return new ( Backbone.View.extend( {

            className: 'container dashboard-container',

            templateData: { },

            deferredData: undefined,

            events: {

                'click div[data-js="uploadPhotoBtn"]': 'handleUploadPhotoClick',
            },

            initialize: function() {

                this[ ( events.length )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

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
                } );

                return this;
            },

            waitForData: function() {
                this.listenToOnce( events, 'sync', this.render );
            },

            handleUploadPhotoClick: function() {
                console.log($('#profileImageUpload').fileupload());
                $('#profileImageUpload').fileupload( {
                    dataType: 'json',
                    done: function (e, data) {
                        console.log( data );
                    }
                } );
            }

        } ) )();
} );
