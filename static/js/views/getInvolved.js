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
                'click [data-js="eventContainer"]': 'eventClicked'
            },

            initialize: function() {
            
                this.templateData = {};

                this.spinner = new spinner().start();

                this[ ( events.syncd )
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

                if( events.length === 0 ) {
                    alert( "No events for you at the moment.");
                }

                this.spinner.stop();

                return this;
            },

            waitForData: function() {
                this.listenToOnce( events, 'sync', this.render );
            },

            eventClicked: function(e) {

                this.router.navigate(
                    [ 'event', 'detail', $(e.currentTarget).data('id') ].join('/'),
                    { trigger: true } );
            }

        } ) )();
} );
