define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"header\">\n    <span class=\"header-text\">Log in</span>\n    <span data-js=\"error\" class=\"glyphicon glyphicon-exclamation-sign hide\"></span>\n</div>\n<div class=\"input-container\">\n    <div class=\"filler\"></div>\n    <input class=\"email-input\" data-js=\"email\" type=\"text\" placeholder=\"User email\" />\n    <div class=\"filler\"></div>\n    <div class=\"pass-container\">\n        <input class=\"password-input\" data-js=\"pass\" type=\"password\" placeholder=\"password\">\n        <span data-js=\"help\" class=\"glyphicon glyphicon-question-sign\"></span>\n    </div>\n    <div class=\"filler\"></div>\n</div>\n<div class=\"button-container\">\n    <div data-js=\"loginButton\" class=\"login-button button\">\n        <span>Log in</span>\n    </div>\n    <div class=\"or\">\n        <hr></hr>\n        <div>or</div>\n        <hr></hr>\n    </div>\n    <div data-js=\"guestLoginButton\" class=\"guest-login-button button\">\n        <span>Log in as guest</span>\n    </div>\n</div>\n";
  })

});