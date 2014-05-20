define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <div data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"local-event-item\">\n                        <div data-js=\"eventBtn\" class=\"local-event-image\">\n                            <img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageUrl)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                        </div>\n                        <div class=\"local-event-text\">\n                            <div data-js=\"eventBtn\" class=\"local-event-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                            <div data-js=\"eventBtn\" class=\"local-event-location\">"
    + escapeExpression(((stack1 = (depth0 && depth0.datetime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                        </div>\n                    </div>\n                ";
  return buffer;
  }

  buffer += "<div class=\"row\">\n\n    <div class=\"col-md-4 dashboard-id\">\n        <div class=\"row\">\n            <div class=\"col-md-6\">\n                 <div data-js=\"profileImageWrapper\" class=\"profile-image-wrapper\">\n                    <div data-js=\"profileImage\" class=\"profile-image\"></div>\n                </div>               \n                <div data-js=\"uploadPhotoBtn\" class=\"upload-photo-btn\" >\n                    <span class=\"glyphicon glyphicon-camera\"></span>\n                    <span>Upload</span>\n                </div>\n                <input data-js=\"profileImageUpload\" class=\"file-upload\" id=\"profileImageUpload\" type=\"file\" name=\"files[]\" data-url=\"/profileImage/post\">\n            </div>\n            <div class=\"col-md-6\">\n                <div class=\"name\">Hello, "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "!</div>\n                <div class=\"bus-name\">Bus #"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.busName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"dashboard-leaderboard\">\n        <div class=\"leaderboard-header\">4-Week Challenge Leaderboard</div>\n        <div class=\"leaderboard-item-container\" data-js=\"leaderboardItems\"></div>\n    </div>\n\n</div>\n\n<div class=\"row\">\n\n    <div class=\"col-md-4 dashboard-100-point\">\n        <div class=\"header\">100 Point Challenge</div>\n        <div class=\"content\">\n            <div class=\"individual-point-display\">\n                <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.points)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </div>\n            <div class=\"out-of-display\">\n                <div>\n                    <div>Points out</div>\n                    <div>of 100</div>\n                </div>\n            </div>\n        </div>\n        <div data-js=\"hundredPointBtn\" class=\"complete-challenge-btn btn\">Complete a Challenge!</div>\n    </div>\n\n    <div class=\"dashboard-local-events\">\n        <div class=\"local-event-header\">Local Events</div>\n            <div data-js=\"localEventItems\" class=\"local-event-items\"\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.events), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  })

});