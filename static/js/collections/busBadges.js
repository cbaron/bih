define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/busMatePost',
      'models/user'
    ],
    
    function( $, _, Backbone, post, user ) {

        return new( Backbone.Collection.extend( {

            initialize: function() {
                this.fetch( {
                    data: {
                        busId: user.get('busId')
                    } } );
                return this;
            },

            url: '/post',

            model: post

        } ) )();
    }
);
