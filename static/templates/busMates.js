define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div data-js=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"bus-mate-row\">\n        <div class=\"image\">\n            <img data-js=\"image\"/>\n        </div>\n        <div class=\"bus-mate-detail\">\n            <span class=\"glyphicon glyphicon-comment\"></span>\n            <span class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.lastName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"badge-container\" data-js=\"badgeContainer\"></span>\n        </div>\n        <div class=\"clearfix hide\">\n            <div class=\"col-md-2\"></div>\n            <div class=\"detail-container\" data-js=\"detailContainer\"></div>\n        </div>\n    </div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.busMates), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  })

});