define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div data-js=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"bus-row\" data-rank=\""
    + escapeExpression(((stack1 = (depth0 && depth0.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"bus-row-left\">\n            <span class=\"bus-rank\">"
    + escapeExpression(((stack1 = (depth0 && depth0.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </div>\n        <div class=\"bus-row-right\">\n            <span class=\"bus-name\">Bus "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"point-container\">\n                <span class=\"bus-points\">"
    + escapeExpression(((stack1 = (depth0 && depth0.totalPoints)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                <span class=\"points\">points</span>\n            </span>\n        </div>\n    </div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.buses), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  })

});