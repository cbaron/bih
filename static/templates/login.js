define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"header\">Log in <span data-js=\"error\" class=\"glyphicon glyphicon-exclamation-sign hide\"></span></div>\n<div class=\"input-container\">\n    <input data-js=\"email\" type=\"text\" placeholder=\"User email\" />\n    <input data-js=\"pass\" type=\"password\" placeholder=\"password\" />\n</div>\n<div class=\"button-container\">\n    <div data-js=\"loginButton\" class=\"login-button button\">\n        <span>Log in</span>\n    </div>\n    <div class=\"or\">\n        <hr></hr>\n        <div>or</div>\n        <hr></hr>\n    </div>\n    <div data-js=\"guestLoginButton\" class=\"guest-login-button button\">\n        <span>Log in as guest</span>\n    </div>\n</div>\n";
  })

});