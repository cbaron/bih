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
            'click button[data-js="submitBtn"]': 'submitClicked'
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
            var self = this;

            if( $.trim( this.templateData.text.val() ) !== '' &&
                $.trim( this.templateData.subject.val() ) !== '' ) {
                $.ajax( {
                    url: 'message',
                    type: 'POST',
                    data: {
                        toId: this.options.id,
                        toName: this.options.name,
                        fromName: this.options.from,
                        subject: this.templateData.subject.val(),
                        body: this.templateData.text.val() },
                    success: function() { self.trigger('close').remove() } } );
            }
        }
    } );
} );
