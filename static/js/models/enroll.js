define( [ 'backbone', 'models/user' ], function( Backbone, user ) {
    
    return new ( Backbone.Model.extend( {

        initialize: function() {
            this.fetch();
            return this;
        },

        defaults: { "challengeId": undefined },

        urlRoot: '/enroll',

        sync: function( method, model ) {
            if( method === 'read' ) {
            }

            if( method === 'create' ) {
                $.ajax( {
                    url: [ '/enroll/default/',
                           user.get('busId'),
                           this.get('challengeId') ].join('/'),
                    type: 'POST' } );
            }
        }

    } ) )();
} );

/*
fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },
*/
