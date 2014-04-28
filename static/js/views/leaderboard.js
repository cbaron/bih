define(

    [ 'jquery',
      'underscore',
      'backbone',
      'templates/leaderboard',
      'css!styles/leaderboard'
    ],
    
    function( $, _, Backbone, leaderboardHtml ) {

        return Backbone.View.extend( {

            events: {
            },

            initialize: function( options ) {

                _.extend( this, { user: options.user, buses: options.buses } );

                this[ ( this.buses.length )
                    ? 'render'
                    : 'waitForBusData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: dashboardHtml( { } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                return this;
            },

            waitForBusData: function() {
                this.listenToOnce( this.buses, 'change', this.render );
            }

        } );
} );
