define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/user',
      'templates/login',
      'css!styles/login'
    ],
    
    function( $, _, Backbone, user, template ) {

    return new ( Backbone.View.extend( {

            templateData: {},

            events: {

                'click div[data-js="loginButton"]': 'loginClicked'
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
                user.fetch( {
                    data: {
                        e: this.templateData.email.val(),
                        p: this.templateData.pass.val()
                    }
                } );

                this.listenToOnce( user, 'sync', this.handleResponse );
            },

            handleResponse: function() {
                if( user.get('isLoggedIn') ) {
                    this.router.toDo();
                    this.trigger('success').$el.fadeOut();
                } else {
                    console.log('error logging in');
                }
            }

        } ) )();
} );
