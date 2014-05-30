define(
    [
      'jquery',
      'underscore',
      'backbone',
      'views/modalSpinner',
      'models/user',
      'templates/help',
      'css!styles/help'
    ],

    function( $, _, Backbone, spinner, user, template ) {

        return new ( Backbone.View.extend( {

            className: 'help-container',


            events: {
            },

            initialize: function() {

                this.render();
                return this;
            },

            render: function() {
                var self = this;

                this.templateData = { };

                this.slurpTemplate( {
                    template: template( { } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                return this;
            },

        } ) )();
} );
