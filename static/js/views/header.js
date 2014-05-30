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

        templateData: { },

        events: {
            
           'click  [data-js="dropdownButton"]': 'menuClicked',
           'click  [data-js="menu"]': 'menuClicked',
           'click  [data-js="fourWeekChallengeBtn"]': 'handleFourWeekBtnClick',
           'click  [data-js="hundredPointChallengeBtn"]': 'handlePointChallengeBtnClick',
           'click  [data-js="getInvolvedBtn"]': 'getInvolvedClicked',
           'click  [data-js="myBusBtn"]': 'myBusClicked',
           'click  [data-js="inbox"]': 'inboxClicked',
           'click  [data-js="logout"]': 'logoutClicked',
           'click  [data-js="homeBtn"]': 'homeClicked',
           'click  [data-js="helpBtn"]': 'helpClicked',
           'click  [data-js="mobileMenuBtn"]': 'mobileMenuClicked',
           'click  [data-js="mobileMenu"] li': 'mobileMenuClicked'
                
        },

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
        },

        menuClicked: function(e) {
            var menu = $(e.currentTarget).siblings('[data-js="menu"]');
           
            if( menu.hasClass('hide') ) {
                menu.removeClass('hide');
            } else {
                menu.addClass('hide');
            }
        },

        handleFourWeekBtnClick: function() {
            this.router.navigate( 'fourweekchallenge', { trigger: true } );
        },

        handlePointChallengeBtnClick: function() {
            this.router.navigate('hundredpointchallenge', { trigger: true} );
        },
        
        getInvolvedClicked: function() {
            this.router.navigate('getinvolved', { trigger: true} );
        },
        
        myBusClicked: function() {
            this.router.navigate('mybus', { trigger: true} );
        },
        
        inboxClicked: function() {
            this.router.navigate('inbox', { trigger: true} );
        },
        
        homeClicked: function() {
            this.router.navigate('', { trigger: true} );
        },
        
        helpClicked: function() {
            console.log('asdad');
            this.router.navigate('help', { trigger: true} );
        },

        logoutClicked: function() {
            console.log('asd');
            window.location = '/logout';
        },

        mobileMenuClicked: function() {
            if( this.templateData.mobileMenu.hasClass('hide') ) {
                this.templateData.mobileMenu.removeClass('hide');
            } else {
                this.templateData.mobileMenu.addClass('hide');
            }
        }

    } );

    return new header( { el: '#header' } );
} );
