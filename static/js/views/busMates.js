define(

    [ 'jquery',
      'underscore',
      'backbone',
      'collections/busMates',
      'templates/busMates',
      'css!styles/busMates'
    ],
    
    function( $, _, Backbone, busMates, template ) {

        return Backbone.View.extend( {

            events: {
            },

            templateData: { },

            initialize: function( options ) {

                this[ ( busMates.length )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: template( {
                        busMates: busMates.toJSON()
                    } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: false
                } );

                return this;
            },

            waitForData: function() {
                this.listenToOnce( busMates, 'sync', this.render );
            }

        } );
} );
