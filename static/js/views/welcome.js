define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/user',
      'templates/welcome',
      'css!styles/welcome'
    ],
    
    function( $, _, Backbone, user, welcomeHtml ) {

        var welcome = Backbone.View.extend( {

            className: 'container',

            events: {

                'click button[data-js="submitButton"]': 'submitClicked'
            },

            initialize: function() {

                this[ ( user.has('firstName') )
                    ? 'render'
                    : 'waitForUserData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: welcomeHtml( user.attributes ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                return this;
            },

            waitForUserData: function() {
                this.listenToOnce( user, 'change', this.render );
            },

            submitClicked: function() {
               
                this.$el.hide();
                this.router.navigate( 'dashboard', { trigger: true } );
            }

        } );

        return new welcome();
} );
