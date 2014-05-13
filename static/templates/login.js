define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"login-container\">\n    <div class=\"header\">Log in</div>\n    <div class=\"input-container\">\n        <input data-js=\"email\" type=\"text\" placeholder=\"User email\" />\n        <input data-js=\"pass\" type=\"text\" placeholder=\"password\" />\n    </div>\n    <div data-js=\"loginButton\" class=\"login-button button\">Log in</div>\n    <div class=\"or\">\n        <hr></hr>\n        <div>or</div>\n        <hr></hr>\n    </div>\n    <div data-js=\"guestLoginButton\" class=\"guest-login-button button\">Log in as guest</div>\n</div>\n";
  })

});