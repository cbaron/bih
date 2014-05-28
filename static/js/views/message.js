define(

    [ 'jquery',
      'underscore',
      'backbone',
      'spin',
      'templates/message',
      'css!styles/message'
    ],
    
    function( $, _, Backbone, Spinner, template ) {

    return Backbone.View.extend( {

        className: [
            "message-container",
            "col-md-4 col-md-offset-4",
            "col-sm-8 col-sm-offset-2",
            "col-xs-8 col-xs-offset-2" ].join(" "),

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

                this.undelegateEvents();
                this.templateData.submitBtn.addClass('clicked');
                this.spinner = new Spinner( {
                    color: '#fff',
                    radius: 5,
                    length: 5,
                } ).spin( this.templateData.submitBtn.get(0) );

                $.ajax( {
                    url: 'message',
                    type: 'POST',
                    data: {
                        toId: this.options.id,
                        toName: this.options.name,
                        fromName: this.options.from,
                        subject: this.templateData.subject.val(),
                        body: this.templateData.text.val() },
                    complete: function() {
                        self.delegateEvents();
                        self.spinner.stop();
                        self.templateData.submitBtn.removeClass('clicked');
                        self.trigger('close').remove();
                    } } );
            }
        }
    } );
} );
