define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <div data-js=\"message\" class=\"message-item\">\n                        <div class=\"icon\">\n                            <span class=\"glyphicon glyphicon-envelope\"></span>\n                        </div>\n                        <div data-js=\"detail\" class=\"detail\">\n                            <div class=\"detail-header\">\n                                <div class=\"name\">";
  if (helper = helpers.fromName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fromName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n                                <div class=\"subject\">";
  if (helper = helpers.subject) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subject); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n                            </div>\n                            <div class=\"body\">";
  if (helper = helpers.body) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.body); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n                        </div>\n                        <div class=\"date\">";
  if (helper = helpers.sent) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sent); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n                    </div>\n                ";
  return buffer;
  }

  buffer += "<div class=\"header\">Messages</div>\n<div class=\"inbox-container\">\n    <div class=\"col-md-12\">\n        <div class=\"sub-header\">Inbox</div>\n        <div class=\"item-container\">\n            <div class=\"col-md-12\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.message), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  })

});