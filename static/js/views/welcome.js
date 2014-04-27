define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/user',
      'templates/welcome',
      'css!styles/welcome'
    ],
    
    function( $, _, Backbone, user, welcomeHtml ) {

    var header = Backbone.View.extend( {

        initialize: function() {

            this[ ( user.has('firstName') )
                ? 'render'
                : 'waitForUserData' ]();

            return this;
        },

        render: function() {

            this.slurpTemplate( {
                template: welcomeHtml( user.attributes ),
                insertion: { $el: this.$el, method: 'append' },
                partsObj: this.templateData,
                keepDataJs: true
            } );

            return this;
        },

        waitForUserData: function() {
            this.listenToOnce( user, 'change', this.render );
        }
    } );

    return new header( { el: '#content' } );
} );
