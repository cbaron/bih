define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div data-js=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"challenge-row\"\">\n        <span class=\"number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <span class=\"title\">Bus "
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <span class=\"points\">( "
    + escapeExpression(((stack1 = (depth0 && depth0.pointValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " pt)</span>\n        <span class=\"description\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.challenges), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  })

});