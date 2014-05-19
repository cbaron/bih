define(

    [ 'jquery',
      'underscore',
      'backbone',
      'collections/events',
      'templates/getInvolved',
      'css!styles/getInvolved'
    ],
    
    function( $, _, Backbone, events, template ) {

        return new ( Backbone.View.extend( {

            className: 'container get-involved-container',

            templateData: { },

            events: {
            },

            initialize: function() {

                //should just get the user on every route
                this[ ( events.length )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: template( { user: user.attributes } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                return this;
            },

            waitForData: function() {
                this.listenToOnce( events, 'sync', this.render );
            }

        } ) )();
} );
