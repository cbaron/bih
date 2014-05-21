define( [ 'backbone' ], function( Backbone ) {
    
    return new ( Backbone.Model.extend( {

        initialize: function() {
            this.fetch();
            return this;
        },

        defaults: { "challengeId": undefined },

        urlRoot: '/enroll'

    } ) )();
} );
