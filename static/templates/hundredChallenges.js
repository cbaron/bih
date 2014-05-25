define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div data-js=\"categoryHeader\" class=\"category-header "
    + escapeExpression(((stack1 = (depth0 && depth0['class'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <div data-js=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-category=\""
    + escapeExpression(((stack1 = (depth0 && depth0.category)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"challenge-row hide\">\n                        <div class=\"col-md-12\">\n                            <div class=\"row\">\n                                <div data-js=\"resize\" class=\"resize hide\">\n                                    <span class=\"glyphicon glyphicon-resize-small\"></span>\n                                </div>\n                                <div class=\"content\">\n                                    <div class=\"heading\">\n                                        <span class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                        <span class=\"count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.points)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                        <span class=\"points\">points</span>\n                                    </div>\n                                    <div class=\"rules\">"
    + escapeExpression(((stack1 = (depth0 && depth0.rules)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                                </div>\n                                <div class=\"check hide\">\n                                    <span class=\"glyphicon glyphicon-ok\"></span>\n                                </div>\n                            </div>\n                            <div data-js=\"submissionContainer\" class=\"submission-container hide\">\n                                <div data-js=\"submittedDate\" class=\"date\"></div>\n                                <div data-js=\"submittedBody\" class=\"body\"></div>\n                                <div class=\"text\">\n                                    <textarea data-js=\"text\" rows=\"5\" placeholder=\"Type submission here...\"></textarea>\n                                </div>\n                                <div class=\"col-md-12\">\n                                    <div class=\"bottom\">\n                                        <span data-js=\"image\" class=\"glyphicon glyphicon-picture\"></span>\n                                        <span data-js=\"video\" class=\"glyphicon glyphicon-facetime-video\"></span>\n                                        <span class=\"filename\" data-js=\"mediaReference\"></span>\n                                        <button data-js=\"submitBtn\" class=\"submit\">Submit</button>\n                                        <input data-js=\"imageUpload\" class=\"file-upload\" id=\"imageUpload\" type=\"file\" name=\"files[]\" data-url=\"/submission/post\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                ";
  return buffer;
  }

  buffer += "<div class=\"header\">100 Point Challenge</div>\n<div class=\"point-container\">\n    <div class=\"col-md-12\">\n        <div class=\"point-header\">You've earned ";
  if (helper = helpers.userPoints) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userPoints); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " points!</div>\n        <div class=\"point-bar-container\">\n            <div data-js=\"pointBar\" class=\"point-bar\"></div>\n        </div>\n    </div>\n</div>\n<div class=\"challenge-container\">\n    <div class=\"col-md-12\">\n        <div class=\"row\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.categories), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"category-footer\"></div>\n        <div data-js=\"challengeList\" class=\"challenge-list\">\n            <div class=\"col-md-12\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  })

});