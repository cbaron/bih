define(

    [ 'jquery',
      'underscore',
      'backbone',
      'templates/challengeList',
      'css!styles/challengeList'
    ],
    
    function( $, _, Backbone, template ) {

        return Backbone.View.extend( {

            events: {
            },

            templateData: { },

            initialize: function( options ) {

                _.extend( this, {
                    challenges: options.challenges
                } );

                this[ ( this.challenges.length )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: template( {
                        week: this.challenges.at(0).attributes.week,
                        challenges: this.challenges.toJSON()
                    } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: false
                } );

                return this;
            },

            waitForData: function() {
                this.listenToOnce( this.challenges, 'sync', this.render );
            }

        } );
} );
