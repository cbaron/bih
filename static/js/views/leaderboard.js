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

            templateData: { },

            initialize: function( options ) {

                _.extend( this, {
                    user: options.user,
                    buses: options.buses,
                    mode: options.mode
                } );

                this[ ( this.buses.length )
                    ? 'render'
                    : 'waitForBusData' ]();

                return this;
            },

            render: function() {

                this.userBusRank =
                    this.buses.find( function( model ) {
                        return model.id === this.user.get('busId')
                    }, this ).get('rank');

                this.slurpTemplate( {
                    template: leaderboardHtml( { user: this.user, buses: this.buses.toJSON() } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: false
                } );

                if( this.mode === 'short' ) { 

                    this.templateData[ this.user.get('busId') ].addClass('user-bus');

                    _.each( this.templateData, ( this.userBusRank < 5 ) ? this.showTopFour : this.showContext , this );
                }

                return this;
            },

            showTopFour: function( el, id ) {
                var el = $(el);
                if( el.data('rank') > 4 ) { el.hide(); }
            },

            //hasn't been tested
            //first place needs bottom border
            showContext: function( el, id ) {
                var el = $(el),
                    busRank = el.data('rank');

                if( busRank != 1 &&
                    busRank != this.userBusRank &&
                    busRank != ( this.userBusRank - 1 ) &&
                    busRank != ( this.userBusRank + 1 ) ) {

                    el.hide();
                }
            },

            waitForBusData: function() {
                this.listenToOnce( this.buses, 'sync', this.render );
            }

        } );
} );
