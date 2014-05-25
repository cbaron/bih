define( [ 'backbone', 'models/message' ], function( Backbone, message ) {

    return new ( Backbone.Collection.extend( {

        initialize: function() { this.fetch(); },

        url: '/message',

        model: message,

        parse: function( response ) {
            return _.map( response, function( message ) {
                message.sent = message.sent.substr( 0, 10 );
                return message;
            } );
        }

    } ) )();

} );
