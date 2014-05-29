define(
    [
        'jquery',
        'underscore',
        'backbone',
        'views/modal',
        'spin',
        'css!styles/modalSpinner'
    ],

    function( $, _, Backbone, modal, Spinner ) {

        return Backbone.View.extend( {

            className: [
                "modal-spinner-container",
                "col-md-2 col-md-offset-5",
                "col-sm-4 col-sm-offset-4",
                "col-xs-6 col-xs-offset-3" ].join(" "),

            initialize: function() {
                
                this.spinner = new Spinner( {
                    color: '#fff',
                } ).spin();

                this.modal = modal;

                return this;
            },

            start: function() {
                 
                this.$el.append( this.spinner.el );

                this.modal.addContent( { content: this.$el } )

                return this;
            },

            stop: function() {
                this.spinner.stop();
                this.modal.closeDialogue();
            }

        } );
    }
);
