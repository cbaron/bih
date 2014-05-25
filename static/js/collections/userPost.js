define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/userPost',
      'models/user'
    ],
    
    function( $, _, Backbone, userPost, user ) {

        return new( Backbone.Collection.extend( {

            initialize: function() {
                this.fetch();
                return this;
            },

            url: '/post',

            model: userPost

        } ) )();
    }
);
