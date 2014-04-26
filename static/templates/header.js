define(['handlebars.runtime'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['header.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"header-row\">\n            <div class=\"header-item clearfix\">\n                <div class=\"pull-left\"> \n                    <div>BRING</div>\n                    <div>ISRAEL</div>\n                    <div>HOME</div>\n                </div>\n            </div>\n            <span class=\"header-item\">4-Week Challenge</span>\n            <span class=\"header-item\">100-Point Challenge</span>\n            <span class=\"header-item\">My Bus</span>\n            <span class=\"header-item\">Help</span>\n            <span class=\"header-item\">Hi "
    + escapeExpression(((helper = helpers.firstName || (depth0 && depth0.firstName)),(typeof helper === functionType ? helper.call(depth0, {"name":"firstName","hash":{},"data":data}) : helper)))
    + "</span>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
});