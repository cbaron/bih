define(

    [ 'jquery',
      'underscore',
      'backbone',
      'models/user',
      'collections/userPost',
      'templates/challengeList',
      'css!styles/challengeList',
    ],
    
    function( $, _, Backbone, user, userPosts, template ) {

        return Backbone.View.extend( {

            defaultCollection: 'challenges',

            delegate: function() {
                var self = this;

                this.templateData.challengeItemContainer.on(
                    'click', '*[data-js]', function(e) { self.handleChallengeClick(e) } );
            },

            initialize: function() {
                var self = this;

                this.templateData = { };

                if( this.collection ) {
                    this.challenges = this.collection;
                    this.render();
                } else {
                
                    require( [ 'collections/challenges' ], function( challenges ) {
                        self.challenges = challenges;
                        self[ ( challenges.length )
                            ? 'render'
                            : 'waitForData' ]();
                    } );
                }

                return this;
            },

            render: function() {

                if( this.challenges.length === 0 ) { return; }

                this.slurpTemplate( {
                    template: template( {
                        week: this.challenges.at(0).attributes.week,
                        challenges: this.challenges.toJSON()
                    } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                if( userPosts.length ) {
                    this.addUserPostMarkup();
                } {
                    this.listenToOnce( userPosts, 'sync', this.addUserPostMarkup );
                }

                this.rendered = true;
                this.trigger('rendered');

                this.delegate();

                return this;
            },

            waitForData: function() {
                this.listenToOnce( this.challenges, 'sync', this.render );
            },

            handleChallengeClick: function(e) {
                this.router.navigate( [
                    'challenge',
                    'detail',
                    user.get('busId'),
                    $(e.currentTarget).attr('data-js') ].join("/"), { trigger: true } );
            },

            addUserPostMarkup: function() {
                
                userPosts.each( function( post ) {
                    if( this.templateData[ post.get('challengeId') ] ) {
                        this.templateData[ post.get('challengeId') ].addClass('completed');
                    }
                }, this );
            }

        } );
} );
