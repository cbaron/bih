define(['handlebars.runtime'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['header.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-1\">\n            <div>BRING</div>\n            <div>ISRAEL</div>\n            <div>HOME</div>\n       </div>\n        <div class=\"col-md-2\">4-Week Challenge</div>\n        <div class=\"col-md-2\">100-Point Challenge</div>\n        <div class=\"col-md-2\">My Bus</div>\n        <div class=\"col-md-2\">Help</div>\n        <div class=\"col-md-2\">Hi "
    + escapeExpression(((helper = helpers.firstName || (depth0 && depth0.firstName)),(typeof helper === functionType ? helper.call(depth0, {"name":"firstName","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n</div>\n";
},"useData":true});
});