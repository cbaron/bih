define( [ 'jquery', 'underscore', 'backbone' ], function( $, _, Backbone ) {

    Backbone.View.prototype.slurpTemplate = function( options ) {
       
       var parts = { },
           $template = $( options.template );

       var $dataJsElements = _.filter( $template, function( element ) { return $( element ).is( '[data-js]'); } );
         
       _.each( $template.get(),
               function( element ) {
                   var dataJsDescendants = $( element ).find( '*[data-js]' );
                   if( dataJsDescendants.length ) {
                       $dataJsElements = $dataJsElements.concat( dataJsDescendants.get() )
                   }
               }
             );

        _.each( $dataJsElements,

            function( element ) {

                var $element = $( element );

                var dataJs = $element.attr( 'data-js' );

                if( ! options.keepDataJs ) { $element.removeAttr( 'data-js' ); }

                if( !( dataJs in parts ) ) {

                    parts[ dataJs ] = $element;

                } else {

                    parts[ dataJs ] = parts[ dataJs ].add( $element );
                }
            }
        );

        if( options.insertion ) { options.insertion.$el[ ( options.insertion.method ) ? options.insertion.method : 'append' ]( $template ); }

        if( options.partsObj ) { $.extend( options.partsObj, parts ); }

        return { parts: parts, $template: $template };
    };

    Backbone.View.prototype.isMouseOnEl = function( event, el ) {

        var elOffset = el.offset();
        var elHeight = el.outerHeight( true );
        var elWidth = el.outerWidth( true );

        if( ( event.pageX < elOffset.left ) ||
            ( event.pageX > ( elOffset.left + elWidth ) ) ||
            ( event.pageY < elOffset.top ) ||
            ( event.pageY > ( elOffset.top + elHeight ) ) ) {

            return false;
        }

        return true;
    }

    return {
        view: function( extension ) {
            _.each( extension, function( value, key ) {
                var obj = { }; obj[ key ] = value;
                _.extend( Backbone.View.prototype, obj );
            } );
        }
    }

} );
