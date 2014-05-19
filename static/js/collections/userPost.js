define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/post',
      'models/user'
    ],
    
    function( $, _, Backbone, post, user ) {

        return new( Backbone.Collection.extend( {

            initialize: function() {
                this.fetch();
                return this;
            },

            url: '/post',

            model: post

        } ) )();
    }
);
