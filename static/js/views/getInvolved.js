define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/modalSpinner',
      'collections/events',
      'templates/getInvolved',
      'css!styles/getInvolved'
    ],
    
    function( $, _, Backbone, spinner, events, template ) {

        return new ( Backbone.View.extend( {

            className: 'container get-involved-container',


            events: {
            },

            initialize: function() {
            
                this.templateData = {};

                this.spinner = new spinner().start();

                //should just get the user on every route
                this[ ( events.length )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: template( { events: events.toJSON() } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.spinner.stop();

                return this;
            },

            waitForData: function() {
                this.listenToOnce( events, 'sync', this.render );
            }

        } ) )();
} );
