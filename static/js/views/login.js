define(

    [ 'jquery',
      'underscore',
      'backbone',
      'spin',
      'models/user',
      'templates/login',
      'css!styles/login'
    ],
    
    function( $, _, Backbone, Spinner, user, template ) {

    return Backbone.View.extend( {

        className: [
            "login-container",
            "col-md-4 col-md-offset-4",
            "col-sm-8 col-sm-offset-2",
            "col-xs-8 col-xs-offset-2" ].join(" "),

        templateData: {},

        events: {

            'click div[data-js="loginButton"]': 'loginClicked',
            'click div[data-js="guestLoginButton"]': 'guestLoginClicked',
            'click span[data-js="help"]': 'helpClicked'

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

        guestLoginClicked: function(e) {
            this.email = "guest@aishny.com";
            this.pass = "guest123";
            this.login(e);
        },

        loginClicked: function(e) {
            this.email = this.templateData.email.val();
            this.pass = this.templateData.pass.val();;
            this.login(e);
        },

        login: function(e) {

            this.undelegateEvents();
            this.templateData.error.addClass('hide');
            this.clickedButton = $(e.currentTarget).addClass('clicked');

            this.spinner = new Spinner( {
                color: '#fff',
                radius: 5,
                length: 5,
            } ).spin( this.clickedButton.get(0) );

            user.fetch( {
                data: {
                    e: this.email,
                    p: this.pass
                }
            } );

            this.listenToOnce( user, 'sync', this.handleResponse );
        },

        handleResponse: function() {
            
            this.spinner.stop();
            this.clickedButton.removeClass('clicked');
            this.delegateEvents();

            if( user.get('isLoggedIn') ) {
                this.router.toDo();
                this.trigger('success').$el.fadeOut();
            } else {
                this.templateData.error.removeClass('hide');
            }
        },

        helpClicked: function() {
            this.trigger('success').$el.fadeOut();
            this.router.navigate( 'help', { trigger: true } );
        }

    } );
} );
