define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/session',
      'templates/login',
      'css!styles/login'
    ],
    
    function( $, _, Backbone, session, template ) {

    return new ( Backbone.View.extend( {

            events: {

                'click button[data-js="login"]': 'loginClicked'
            },

            initialize: function() {

                return this.render();
            },

            render: function() {

                this.slurpTemplate( {
                    template: template(),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                return this;
            },

            loginClicked: function() {
                $.ajax( {
                    url: '/login',
                    type: "POST",
                    data: { e: this.templateData.email,
                            p: this.templateData.pass },
                    success: function( response ) {
                        session.set( 'isLoggedIn', response.isLoggedIn );
                    }
                 } );
            }

        } ) )();
} );
