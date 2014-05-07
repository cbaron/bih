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
            
           'click  *[data-js="dropdownButton"]': 'showDropdown',
           'click  *[data-js="fourWeekChallengeBtn"]': 'handleFourWeekBtnClick'
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

        showDropdown: function() {
            var self = this;

            this.undelegateEvents();
            this.templateData.dropdownButton.addClass('active');
            this.templateData.menu.fadeIn( 400, function() { self.attachClickHandler() } );
        },

        attachClickHandler: function() {
            var self = this;

            this.documentClickHandler = function(e) { self.handleClick(e) };
            $( document ).on( 'click', this.documentClickHandler );
        },

        hideDropdown: function() {
            this.templateData.dropdownButton.removeClass('active');
            this.templateData.menu.hide();
            $( document ).off( 'click', this.documentClickHandler );
            this.delegateEvents();
        },

        handleClick: function(e) {
            if( ! this.isMouseOnEl( e, this.templateData.menu ) ) { this.hideDropdown(); }
        },

        handleFourWeekBtnClick: function() {
            
            this.router.navigate( 'fourweekchallenge', { trigger: true } );

        },

    } );

    return new header( { el: '#header' } );
} );
