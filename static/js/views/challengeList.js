define(

    [ 'jquery',
      'underscore',
      'backbone',
      'collections/challenges',
      'templates/challengeList',
      'css!styles/challengeList'
    ],
    
    function( $, _, Backbone, challenges, template ) {

        return Backbone.View.extend( {

            events: {
            },

            templateData: { },

            initialize: function( options ) {

                this[ ( challenges.length )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: template( {
                        week: challenges.at(0).attributes.week,
                        challenges: challenges.toJSON()
                    } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: false
                } );

                return this;
            },

            waitForData: function() {
                this.listenToOnce( challenges, 'sync', this.render );
            }

        } );
} );
