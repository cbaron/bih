define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n\n    <div class=\"col-md-4 dashboard-id\">\n        <div class=\"row\">\n            <div class=\"col-md-6\">\n                 <div class=\"upload-photo-btn-wrapper\">\n                    <div class=\"upload-photo-btn\"></div>\n                </div>               \n                <div>\n                    <span class=\"glyphicon glyphicon-camera\"></span>\n                    <span>Upload</span>\n                </div>\n            </div>\n            <div class=\"col-md-6\">\n                <div>Hello, "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "!</div>\n                <div>Bus #"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.bus)),stack1 == null || stack1 === false ? stack1 : stack1.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"col-md-2\"></div>\n\n    <div class=\"col-md-6 dashboard-leaderboard\">\n        <div class=\"leaderboard-header\">4-Week Challenge Leaderboard</div>\n        <div data-js=\"leaderboardItems\"></div>\n    </div>\n\n</div>\n\n<div class=\"row\">\n\n    <div class=\"col-md-4 dashboard-100-point\">\n        <div class=\"header\">100 Point Challenge</div>\n        <div class=\"content\">\n            <div class=\"individual-point-display\">\n                <div>74</div>\n            </div>\n            <div class=\"out-of-display\">\n                <div>\n                    <div>Points out</div>\n                    <div>of 100</div>\n                </div>\n            </div>\n        </div>\n        <div class=\"complete-challenge-btn btn\">Complete a Challenge!</div>\n    </div>\n</div>\n";
  return buffer;
  })

});