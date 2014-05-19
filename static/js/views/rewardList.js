define(

    [ 'jquery',
        'underscore',
        'backbone',
        'views/rewardTable',
        'models/user',
        'collections/events',
        'templates/dashboard',
        'css!styles/dashboard',
        'collections/rewardTable'
    ],

    function( $, _, Backbone, rewardTable) {

        var dashboard = Backbone.View.extend( {

            className: 'container dashboard-container',

            templateData: { },

            deferredData: undefined,

            events: {
            },

            initialize: function() {

                this[ ( events.length )
                    ? 'render'
                    : 'waitForData' ]();

                return this;
            },

            render: function() {

                this.slurpTemplate( {
                    template: dashboardHtml( { user: user.attributes, events: events.toJSON() } ),
                    insertion: { $el: this.$el.appendTo( $('#content') ), method: 'append' },
                    partsObj: this.templateData,
                    keepDataJs: true
                } );

                this.rewardTable = new rewardTable( {
                    el: this.templateData.rewards,
                    mode: 'short',
                    user: user
                } );

                return this;
            },

            waitForData: function() {
                this.listenToOnce( events, 'sync', this.render );
            }

        } );

        return new dashboard( { el: '#content' } );
    } );