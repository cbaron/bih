/**
 * Created by tonybaron on 5/8/14.
 * HueHue'd by Chris Baron on 5/20/14
 */
define(
    [
      'jquery',
      'underscore',
      'backbone',
      'models/enroll',
      'models/user'
    ],

    function( $, _, Backbone, enroll, user ) {

        return new ( Backbone.View.extend( {

            className: 'hundred-point-container',

            templateData: { },

            events: {
                'click button[data-js="selectBtn"]': 'selectClicked'
            },

            initialize: function() {

                console.log( enroll);

                this[ ( enroll.has('challengeId') )
                    ? 'waitForData'
                    : 'waitForEnrollData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: this.template( this.templateInput ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                return this;
            },

            optionController: function() {
                this.templateInput = { data: this.options.toJSON() };
                this.render();
            },

            challengeController: function() {
                var categories = [],
                    categoryClass = '';

                categories = _.uniq( _.pluck( this.challenges.toJSON(), 'category' ) );
                categoryClass = 'col-md-' + Math.floor( 12 / categories.length );
                this.templateInput = {
                    data: this.challenges.toJSON(),
                    userPoints: user.get('points'),
                    categories: categories,
                    categoryClass: categoryClass
                };
                this.render();
            },

            waitForEnrollData: function() {
                this.listenToOnce( enroll, 'sync', this.waitForData );
            },

            waitForData: function() {
                var self = this;

                if( enroll.get('challengeId') ) {
                    require(
                        [ 'collections/hundredChallenge',
                          'templates/hundredChallenges',
                          'css!styles/hundredChallenges' ],
                             
                        function( challenges, template ) {
                            self.challenges = challenges;
                            self.template = template;
                            if( challenges.length ) { this.challengeController(); }
                            else { self.listenToOnce( challenges, 'sync', self.challengeController ); }
                        }
                    );
                } else {
                    require(
                        [ 'collections/challengeOption',
                          'templates/challengeOptions',
                          'css!styles/challengeOptions' ],
                               
                        function( options, template ) {
                            self.options = options;
                            self.template = template;
                            if( options.length ) { this.optionController(); }
                            else { self.listenToOnce( options, 'sync', self.optionController ); }
                            
                        }
                    );
                }
            },

            selectClicked: function(e) {
                enroll.set('challengeId', $(e.currentTarget).data('id') ).save();
            }

        } ) )();
    } );
