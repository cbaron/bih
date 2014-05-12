define(

    [ 'jquery',
      'underscore',
      'backbone',
      'templates/challengeList',
      'css!styles/challengeList'
    ],
    
    function( $, _, Backbone, template ) {

        return Backbone.View.extend( {

            defaultCollection: 'challenges',

            templateData: { },

            delegate: function() {
                var self = this;

                this.templateData.challengeItemContainer.on(
                    'click', '*[data-js]', function(e) { self.handleChallengeClick(e) } );
            },

            initialize: function( options ) {
                var self = this;

                require( [ [ 'collections/',
                    ( options )
                        ? ( options.type )
                            ? options.type
                            : this.defaultCollection
                        : this.defaultCollection ].join("") ], function( challenges ) {

                            self.challenges = challenges;
                            self[ ( challenges.length )
                                ? 'render'
                                : 'waitForData' ]();
                        } );

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
                    keepDataJs: true
                } );

                this.delegate();

                return this;
            },

            waitForData: function() {
                this.listenToOnce( this.challenges, 'sync', this.render );
            },

            handleChallengeClick: function(e) {
                this.router.navigate( [ 'challenge', 'index', $(e.currentTarget).attr('data-js') ].join("/"), { trigger: true } );
            }

        } );
} );
