define(['handlebars.runtime'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['welcome.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div class=\"container\">\n    <div class=\"row\">Welcome, "
    + escapeExpression(((helper = helpers.firstName || (depth0 && depth0.firstName)),(typeof helper === functionType ? helper.call(depth0, {"name":"firstName","hash":{},"data":data}) : helper)))
    + "!</div>\n    <div class=\"row\">Join Bus (number) and win a trip back to Israel!</div>\n    <div class=\"row\">\n        <div class=\"col-md-3\">Upload Photo</div>\n        <div class=\"col-md-9\">\n            <form class=\"form-horizontal\" role=\"form\">\n                <div class=\"form-group\">\n                    <label for=\"name\" class=\"col-md-2 control-label\">Name</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"text\" class=\"form-control\" id=\"name\" value=\""
    + escapeExpression(((helper = helpers.firstName || (depth0 && depth0.firstName)),(typeof helper === functionType ? helper.call(depth0, {"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = helpers.lastName || (depth0 && depth0.lastName)),(typeof helper === functionType ? helper.call(depth0, {"name":"lastName","hash":{},"data":data}) : helper)))
    + "\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"birthday\" class=\"col-md-2 control-label\">Birthday</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"text\" class=\"form-control\" id=\"birthday\" placeholder=\"Birthday\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email\" class=\"col-md-2 control-label\">Email</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"text\" class=\"form-control\" id=\"email\" value=\""
    + escapeExpression(((helper = helpers.emailAddress || (depth0 && depth0.emailAddress)),(typeof helper === functionType ? helper.call(depth0, {"name":"emailAddress","hash":{},"data":data}) : helper)))
    + "\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email\" class=\"col-md-2 control-label\">Email</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"text\" class=\"form-control\" id=\"email\" value=\""
    + escapeExpression(((helper = helpers.emailAddress || (depth0 && depth0.emailAddress)),(typeof helper === functionType ? helper.call(depth0, {"name":"emailAddress","hash":{},"data":data}) : helper)))
    + "\">\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
});