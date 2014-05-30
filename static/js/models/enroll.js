define( [ 'backbone', 'models/user' ], function( Backbone, user ) {
    
    return new ( Backbone.Model.extend( {

        initialize: function() {
            this.fetch();
            return this;
        },

        defaults: { "challengeId": undefined },

        urlRoot: '/enroll',

        sync: function( method, model ) {
            var self = this;
            if( method === 'read' ) {
                return $.ajax( {
                    url: '/enroll',
                    type: 'GET',
                    success: function( response ) {
                        self.set(response).trigger('sync');
                    } } );
            }

            if( method === 'create' ) {
                return $.ajax( {
                    url: [ '/enroll/index',
                           user.get('busId'),
                           this.get('challengeId') ].join('/'),
                    type: 'POST' } );
            }
        }

    } ) )();
} );
