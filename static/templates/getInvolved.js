define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-js=\"eventContainer\" class=\"event-container\">\n            <div class=\"image col-md-4 col-sm-4 col-xs-4\">\n                <img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageUrl)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            </div>\n            <div class=\"detail col-md-8 col-sm-8 col-xs-8\">\n                <div class=\"title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                <div class=\"description\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </div>\n        </div>\n    ";
  return buffer;
  }

  buffer += "<div class=\"get-involved-header\">Get Involved</div>\n<div class=\"row\">\n    <div class=\"get-involved-item-container col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.events), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  })

});