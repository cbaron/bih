define(

    [ 'router',
      'extendBackbone',
      'css!styles/bootstrap',
      'css!styles/bootstrap-theme',
      'css!styles/app'
    ],
    
    function( Router, ExtendBackbone ) {

        ExtendBackbone.view( { router: Router } );
    }
);
