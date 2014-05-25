define(

    [ 'jquery',
      'underscore',
      'backbone',
      'templates/message',
      'css!styles/message'
    ],
    
    function( $, _, Backbone, template ) {

    return Backbone.View.extend( {

        className: 'message-container',

        templateData: {},

        events: {

            'click span[data-js="closeBtn"]': 'closeClicked',
            'click div[data-js="submitClicked"]': 'submitClicked'
        },

        initialize: function( options ) {

            this.options = options;

            return this.render();
        },

        render: function() {

            this.slurpTemplate( {
                template: template( this.options ),
                insertion: { $el: this.$el, method: 'append' },
                partsObj: this.templateData,
                keepDataJs: true
            } );

            return this;
        },

        closeClicked: function() {
            this.trigger('close').remove();
        },
        
        submitClicked: function() {
        }

    } );
} );
