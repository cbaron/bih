define(

    [ 'jquery',
      'underscore',
      'backbone',
      'templates/header'
    ],
    
    function( $, _, Backbone, headerHtml ) {

    var header = Backbone.View.extend( {

        initialize: function() {

            this.render();

            return this;
        },

        render: function() {

            this.slurpTemplate( {
                template: headerHtml(),
                insertion: { $el: this.$el, method: 'append' },
                partsObj: this.templateData,
                keepDataJs: true
            } );

            return this;
        }
    } );

    var b = new header( { el: '#header' } );

    return b;
    
} );
