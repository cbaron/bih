define(

    [ 'jquery',
      'underscore',
      'backbone',
      'collections/events',
      'templates/event',
      'css!styles/event'
    ],
    
    function( $, _, Backbone, events, template ) {

        return new ( Backbone.View.extend( {

            className: 'event-page',

            templateData: { },

            events: {
               'click  button[data-js="thumbsUp"]': 'thumbsUpClicked',
               'click  button[data-js="nextTime"]': 'nextTimeClicked',
               'click  button[data-js="notForMe"]': 'notForMeClicked',
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

                return this;
            },

            renderData: function() {

                this.event = events.get( this.eventId );

                this.templateData.name.text( this.event.get('name') );
                this.templateData.imageUrl.attr( 'src', this.event.get('imageUrl') );
                this.templateData.datetime.text( this.event.get('datetime') );
                this.templateData.description.text( this.event.get('description') );

            },

            update: function( id ) {
                
                this.eventId = id;

                this[ ( events.length )
                    ? 'renderData'
                    : 'waitForData' ]();
                
                if( this.$el.is(':hidden') ) {
                    this.$el.fadeIn();
                }
            },

            waitForData: function() {
                this.listenToOnce( events, 'sync', this.renderData );
            }

        } ) )();
    }
);
