define(

    [ 'jquery',
      'underscore',
      'backbone',
      'collections/buses',
      'templates/leaderboard',
      'css!styles/leaderboard'
    ],
    
    function( $, _, Backbone, buses, leaderboardHtml ) {

        return Backbone.View.extend( {

            events: {
            },

            templateData: { },

            initialize: function( options ) {

                _.extend( this, {
                    user: options.user,
                    mode: options.mode
                } );

                this[ ( buses.length )
                    ? 'render'
                    : 'waitForBusData' ]();

                return this;
            },

            render: function() {

                this.userBusRank =
                    buses.find( function( model ) {
                        return model.id === this.user.get('busId')
                    }, this ).get('rank');

                this.slurpTemplate( {
                    template: leaderboardHtml( { user: this.user, buses: buses.toJSON() } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: false
                } );

                if( this.mode === 'short' ) { 
                    this.templateData[ this.user.get('busId') ].addClass('user-bus');
                    _.each( this.templateData, ( this.userBusRank < 5 ) ? this.showTopFour : this.showContext , this );
                } else if ( this.mode === 'leader' ) {
                    _.each( this.templateData, this.showOnlyLeader, this )
                }

                return this;
            },

            showOnlyLeader: function( el ) {
                var el = $(el);
                if( el.data('rank') > 1 ) { el.hide(); }
            },

            showTopFour: function( el ) {
                var el = $(el);
                if( el.data('rank') > 4 ) { el.hide(); }
            },

            //hasn't been tested
            //first place needs bottom border
            showContext: function( el ) {
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
                this.listenToOnce( buses, 'sync', this.render );
            }

        } );
} );
