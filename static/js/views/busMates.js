define(

    [ 'jquery',
      'underscore',
      'backbone',
      'views/modalSpinner',
      'collections/busMates',
      'collections/challenges',
      'collections/busBadges',
      'models/user',
      'views/modal',
      'views/message',
      'templates/busMates',
      'templates/badge',
      'css!styles/busMates'
    ],
    
    function( $, _, Backbone, spinner, busMates, challenges, busBadges, user, modal, messageView, template, badgeHtml ) {

        return Backbone.View.extend( {

            events: {
                'click span[data-js="voteOffBtn"]': 'voteOffClicked',
                'click span[data-js="messageBtn"]': 'messageClicked'
            },

            initialize: function( options ) {

                this.mode = options.mode;
                this.challengeId = options.challengeId;

                this[ ( busMates.syncd )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

		if( busMates.length === 0 ) {
			this.rendered = true;
			this.trigger('rendered');
			return;
		}
            
                this.templateData = { };

                this.slurpTemplate( {
                    template: template( {
                        busMates: busMates.toJSON()
                    } ),
                    insertion: { $el: this.$el, method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                if( this.mode === 'myBus' ) {
                    this.templateData.voteOffBtn.removeClass('hide');
                }
                
                if( this.mode === 'badges' ) {
                    this.templateData.messageBtn.removeClass('hide');
                }

                this.rendered = true;
                this.trigger('rendered');

                if( busBadges.length ) {
                    this.renderBadges();
                } else {
                    this.listenToOnce( busBadges, 'sync', this.renderBadges );
                }

                return this;
            },

            update: function( challengeId ) {
                this.challengeId = challengeId;

                this.templateData.postImage
                        .removeClass('enabled')
                        .attr('src','');

                this.templateData.detailContainer.text('');
                
                this.listenToOnce( busBadges, 'sync', this.renderBadges );
                busBadges.fetch( { data: { busId: user.get('busId') } } );
            },

            renderBadges: function() {
                var self = this,
                    fun = function() { busBadges.each( function( model ) {
                        if( this.templateData ) {
                            var challenge = challenges.find( function( challenge ) {
                                    return ( challenge.id == model.get('challengeId') ) }, this );
                            if( challenge && challenge.has('number') ) {
                                this.templateData[ model.get('userId') ].find( '[data-js="badgeContainer"]').append(
                                    badgeHtml( { number: challenge.get('number') } ) );
                            }
                        }
                    }, this ); },
                    detail = function() { busBadges.each( function( model ) {
                        if( model.get('challengeId') === this.challengeId ) {

                            if( model.get('body') ) {
                                this.templateData[ model.get('userId') ]
                                    .css( 'height', 'inherit' )
                                    .find( 'div[data-js="detailContainer"]').text( model.get('body') ).parent().removeClass('hide');
                            }

                            var url = model.get('url');
                            if( url ) {

                                if( url.indexOf('youtube') > -1 ) {
                                    var video_id = url.split('v=')[1];
                                    var ampersandPosition = video_id.indexOf('&');
                                    if(ampersandPosition != -1) {
                                      video_id = video_id.substring(0, ampersandPosition);
                                    }

                                    this.templateData[ model.get('userId') ]
                                        .find( 'img[data-js="postImage"]')
                                            .attr( 'src', 'http://img.youtube.com/vi/' + video_id + '/1.jpg' )
                                            .addClass('enabled')
                                            .on( 'click', function() { window.open( url ); } );
                                } else {
                                    this.templateData[ model.get('userId') ]
                                        .find( 'img[data-js="postImage"]')
                                            .attr( 'src', url )
                                            .addClass('enabled')
                                            .on( 'click', function() { window.open( url ); } );
                                }
                            }
                            
                        } }, this ); },
                    toCall = undefined;
    
                if( this.mode === 'badges' ) { toCall = function() { fun.call(self); } }
                else { toCall = function() { detail.call(self) } }

                if( challenges.length ) { toCall(); }
                else { this.listenToOnce( challenges, 'sync', toCall ); }
                return this;
            },

            waitForData: function() {
                this.listenToOnce( busMates, 'sync', this.render );
            },

            messageClicked: function(e) {

                var row = $(e.currentTarget).closest('[data-type="busMate"]');

                this.messageView = new messageView( {
                    id: row.data('js'),
                    from: user.get('firstName') + ' ' + user.get('lastName'),
                    name: row.find('[data-js="name"]').text() } );

                modal.listenToOnce( this.messageView, 'close', modal.closeDialogue );
                modal.addContent( { content: this.messageView.$el } );
            },

            voteOffClicked: function(e) {

                self.spinner = new spinner().start();

                $.ajax( {
                    url: 'voteOff',
                    type: 'POST',
                    data: {
                        id: $(e.currentTarget).closest('[data-type="busMate"]').data('js')
                    }
                } ).done( function() {
                    $(e.currentTarget).fadeOut(600);
                    self.spinner.stop(); } );
            }
        } );
} );
