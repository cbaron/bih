define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"header-row\">\n    <div class=\"header\">Send Message</div>\n    <span data-js=\"closeBtn\" class=\"glyphicon glyphicon-remove\"></span>\n</div>\n<div class=\"name\">To : ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n<div class=\"submission\">\n    <div class=\"text\">\n        <textarea data-js=\"text\" rows=\"5\" placeholder=\"Enter your message here...\"></textarea>\n    </div>\n    <div class=\"bottom\">\n        <div>\n            <span class=\"nothingness\"></span>\n            <button data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-js=\"submitBtn\" class=\"submit\">Submit</button>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  })

});