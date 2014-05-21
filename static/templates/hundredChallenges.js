define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <div class=\"category-header ";
  if (helper = helpers.categoryClass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.categoryClass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</div>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <div data-category=\""
    + escapeExpression(((stack1 = (depth0 && depth0.category)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"challenge-row\">\n                        <div class=\"content\">\n                            <div class=\"heading\">\n                                <span class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                <span class=\"count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.points)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                <span class=\"points\">points</span>\n                            </div>\n                            <div class=\"rules\">"
    + escapeExpression(((stack1 = (depth0 && depth0.rules)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                        </div>\n                        <div class=\"check\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                        </div>\n                    </div>\n                ";
  return buffer;
  }

  buffer += "<div class=\"header\">100 Point Challenge</div>\n<div class=\"point-container\">\n    <div class=\"col-md-12\">\n        <div class=\"point-header\">You've earned ";
  if (helper = helpers.userPoints) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userPoints); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " points!</div>\n        <div class=\"point-bar-container\">\n            <div class=\"point-bar\"></div>\n        </div>\n    </div>\n</div>\n<div class=\"challenge-container\">\n    <div class=\"col-md-12\">\n        <div class=\"row\">\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.categories), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"category-footer\"></div>\n        <div class=\"challenge-list\">\n            <div class=\"col-md-12\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  })

});