define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div data-js=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"challenge-row\">\n            <div class=\"number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <div class=\"challenge-detail-wrap\">\n                <div class=\"challenge-detail\">\n                    <span class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                    <span class=\"points\">"
    + escapeExpression(((stack1 = (depth0 && depth0.points)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " pt</span>\n                    <span class=\"rules\">"
    + escapeExpression(((stack1 = (depth0 && depth0.rules)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                </div>\n            </div>\n        </div>\n    ";
  return buffer;
  }

  buffer += "<div class=\"challenge-header\">";
  if (helper = helpers.week) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.week); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n<div class=\"challenge-item-container\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.challenges), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  })

});