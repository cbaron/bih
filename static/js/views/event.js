define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/modalSpinner',
      'collections/events',
      'templates/event',
      'css!styles/event'
    ],
    
    function( $, _, Backbone, spinner, events, template ) {

        return new ( Backbone.View.extend( {

            className: 'event-page',

            templateData: { },

            events: {
               'click  [data-js="backBtn"]':        'backClicked',
               'click  [data-js="interestBtn"]': 'interestClicked'
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

                this.updateInterest();

            },

            updateInterest: function() {

                this.templateData.interestBtn.removeClass('active');

                _.each( [ 'interested', 'maybeInterested', 'notInterested' ], function( value ) {
                    if( this.event.get(value) === true ) {
                        this.templateData.interestBtn.each( function(i, el) {
                            if( $(el).is('[data-value="' + value + '"]') ) {
                                $(el).addClass('active');
                            }
                        } );
                    }
                }, this );
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
            },

            backClicked: function() {
                window.history.back();
            },

            interestClicked: function(e) {
                var interest = { }
                    self = this;

                this.spinner = new spinner().start();
                
                this.event.set( {
                    interested: false,
                    maybeInterested: false,
                    notInterested: false } );

                interest[ $(e.currentTarget).data('value') ] = true;

                this.event.set( interest ).save().done( function() {
                    self.updateInterest();
                    self.spinner.stop();
                } );

            }
            
        } ) )();
    }
);
