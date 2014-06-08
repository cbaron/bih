define(
    [
      'jquery',
      'underscore',
      'backbone',
      'views/modalSpinner',
      'models/user',
      'views/busMates',
      'templates/myBus',
      'css!styles/myBus'
    ],

    function( $, _, Backbone, spinner, user, busMates, template ) {

        return new ( Backbone.View.extend( {

            className: 'my-bus-container',

            events: {
            },

            initialize: function() {

                this.render();
                return this;
            },

            render: function() {
                var self = this;

                this.templateData = {};

                this.spinner = new spinner().start();

                this.slurpTemplate( {
                    template: template( { busName: user.get('busName') } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.busMates = new busMates( {
                    el: this.templateData.busMatesItemContainer,
                    mode: 'myBus'
                } );


                if( this.busMates.rendered ) {
                    this.spinner.stop();
                } else {
                    this.busMates.on( 'rendered', function() {
                        self.spinner.stop();
                    } );
                }

                return this;
            },

        } ) )();
    } );
