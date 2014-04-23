require.config( {

    paths: {

        styles: '../css',

        templates: '../templates'

    },

    shim: {

        'backbone': {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        },

        'underscore': {
            exports: '_'
        },

        'handlebars.runtime': {
            exports: 'Handlebars'
        }
    },

    map: {
        '*': {
            'css': 'css'
        }
    }
} );

require( [ 'app' ] );
