define(

    [ 'jquery',
      'underscore',
      'backbone',
      'collections/inbox',
      'templates/inbox',
      'css!styles/inbox'
    ],
    
    function( $, _, Backbone, inbox, template ) {

        return new( Backbone.View.extend( {

            className: "inbox-container",

            events: {
                'click div[data-js="message"]': 'messageClicked'
            },

            templateData: { },

            initialize: function( options ) {

                this[ ( inbox.length )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: template( { message: inbox.toJSON() } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                return this;
            },

            waitForData: function() {
                this.listenToOnce( inbox, 'sync', this.render );
            },

            messageClicked: function(e) {
                var detailEl = $(e.currentTarget).find('[data-js="detail"]');

                if( detailEl.css('height') === '70px' ) { detailEl.css('height','auto'); }
                else { detailEl.css('height','70px'); }
            }

        } ) )();
} );
