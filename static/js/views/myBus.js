define(
    [
      'jquery',
      'underscore',
      'backbone',
      'models/user',
      'views/busMates',
      'templates/myBus',
      'css!styles/myBus'
    ],

    function( $, _, Backbone, user, busMates, template ) {

        return new ( Backbone.View.extend( {

            className: 'my-bus-container',

            templateData: { },

            events: {
            },

            initialize: function() {

                this.render();
                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: template( { name: user.busName } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.busMates = new busMates( {
                    el: this.templateData.busMatesItemContainer,
                    mode: 'myBus'
                } );

                return this;
            },

        } ) )();
    } );
