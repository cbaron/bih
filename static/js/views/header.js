define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/user',
      'templates/header',
      'css!styles/header'
    ],
    
    function( $, _, Backbone, user, headerHtml ) {

    var header = Backbone.View.extend( {

        initialize: function() {

            this[ ( user.has('firstName') )
                ? 'render'
                : 'waitForUserData' ]();

            return this;
        },

        render: function() {

            this.slurpTemplate( {
                template: headerHtml( user.attributes ),
                insertion: { $el: this.$el, method: 'prepend' },
                partsObj: this.templateData,
                keepDataJs: true
            } );

            return this;
        },

        waitForUserData: function() {
            this.listenToOnce( user, 'change', this.render );
        }
    } );

    return new header( { el: '#header' } );
} );