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

            initialize: function( options ) {

                this.templateData = { };

                _.extend( this, {
                    user: options.user,
                    model: new Backbone.Model( { mode: options.mode } )
                } );

                this.listenTo( this.model, 'change:mode', this.update );

                this[ ( buses.length )
                    ? 'render'
                    : 'waitForBusData' ]();

                return this;
            },

            render: function() {

                var userBus =
                    buses.find( function( model ) {
                        return model.id === this.user.get('busId')
                    }, this );

                if( userBus ) { this.userBusRank = userBus.get('rank'); }

                this.slurpTemplate( {
                    template: leaderboardHtml( { user: this.user, buses: buses.toJSON() } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: false
                } );

                this.update();

                this.rendered = true;
                this.trigger('rendered');

                return this;
            },

            update: function() {
               
                if( this.model.previous('mode') ) {
                    this.$el.removeClass( this.model.previous('mode') + '-mode' );
                } 

                this.$el.addClass( this.model.get('mode') + '-mode' );

                if( this.model.get('mode') === 'short' ) { 

                    //geh, bad data model
                    if( this.user.has('busId') ) {
                        this.templateData[ this.user.get('busId') ].find('.bus-row-right').addClass('user-bus');
                    }

                    _.each( this.templateData, ( this.userBusRank < 5 || ( ! this.user.has('busId') ) )
                        ? this.showTopFour
                        : this.showContext , this );

                } else if ( this.model.get('mode') === 'leader' ) {

                    _.each( this.templateData, this.showOnlyLeader, this )

                } else if ( this.model.get('mode') === 'full' ) {

                    _.each( this.templateData, this.showAll, this );
                }
            },

            showAll: function( el ) {
                el.fadeIn();
            },

            showOnlyLeader: function( el ) {
                if( el.data('rank') > 1 ) { el.fadeOut(); }
            },

            showTopFour: function( el ) {
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
