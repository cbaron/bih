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
        },

        'jquery.fileupload': {
            deps: [ 'jquery', 'jquery.ui.widget' ]
        },
        
        'jquery.ui.widget': {
            deps: [ 'jquery' ]
        },
        
        'dropdown': {
            deps: [ 'jquery' ]
        },
    },

    map: {
        '*': {
            'css': 'css'
        }
    }
} );
