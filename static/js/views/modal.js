define(

    [ 
        'jquery',
        'underscore',
        'backbone',
        'templates/modal',
        'css!styles/modal'
     ],
            
    function( $, _, Backbone, template ) {

        var $document = $(document),
            $window = $(window)
            windowHeight = $window.height(),
            windowWidth = $window.width();


        var view = Backbone.View.extend( {

            templateData: { },

            initialize: function() {

                this.render();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: template(),
                    insertion: { $el: $('body') },
                    partsObj: this.templateData,
                    keepDataJs: false
                } );

                return this;
            },

            addContent: function( options ) {

                this.options = options;

                this.templateData.title.text( ( this.options.title ) ? this.options.title : '' );

                this.templateData.form.append( this.options.content );

                this.sizePositionStyle();
            },

            handleKeyPress: function( e ) {

                /* Make optional */
                //if( e.keyCode === 27 ) { this.closeDialogue(); }

                /* TODO: Add 'Enter' button pressing functionality */
                
            },

            handleClick: function( e ) { return;

                var contentOffset = this.templateData.content.offset();
                var contentHeight = this.templateData.content.outerHeight( true );
                var contentWidth = this.templateData.content.outerWidth( true );

                if( ( e.pageX < contentOffset.left ) ||
                    ( e.pageX > ( contentOffset.left + contentWidth ) ) ||
                    ( e.pageY < contentOffset.top ) ||
                    ( e.pageY > ( contentOffset.top + contentHeight ) ) ) {

                    this.closeDialogue();
                }
            },

            //make this public interface
            sizePositionStyle: function() {

                var parts = this.templateData;
                
                parts.container.show();
                var contentHeight = parts.content.outerHeight( true );
                var contentWidth = parts.content.outerWidth( true );
                parts.container.hide();

                if( this.options.height ) {
                    parts.form.height( this.options.height );
                    contentHeight = this.options.height;
                    parts.form.height( contentHeight - parts.title.outerHeight( true ) );
                }

                if( this.options.width ) {

                    parts.form.width( this.options.width );
                    contentWidth = this.options.width;
                }

                parts.form.css( this.options.containerStyle || { } );

                parts.container.show();
                this.afterShow();
            },

            afterShow: function() {

                $( this.templateData.container.find('input')[0] ).focus();

                $document.on( 'keydown', $.proxy( this.handleKeyPress, this ) );
                $document.on( 'mouseup', $.proxy( this.handleClick, this ) );
                
                this.trigger( 'contentRendered', this.templateData );
            },

            closeDialogue: function() {

                this.hideAndEmpty( { time: 10 } );

                this.turnOffListeners();
                
                this.broadcastClose();
            },

            fadeOutDialogue: function() {
                
                this.hideAndEmpty( { time: 1000 } );
                
                this.turnOffListeners();
                
                this.broadcastClose();
            },

            turnOffListeners: function() {
                $document.off( 'keydown', this.handleKeyPress );
                $document.off( 'click', this.handleClick );
            },

            broadcastClose: function() {
                this.trigger( 'closingModal' );
            },

            hideAndEmpty: function( obj ) {

                this.templateData.container.fadeOut( obj.time, $.proxy( this.emptyContent, this ) );
            },

            emptyContent: function() {
                
                this.templateData.title.text('');
                this.templateData.form.empty();
            }

        } );

        return new view;
    }
);
