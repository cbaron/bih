define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"header-row\">\n            <div class=\"header-item\">\n                <div class=\"header-box-overlay\">\n                    <div class=\"overlay-item\">BRING</div>\n                    <div class=\"overlay-item\">ISRAEL</div>\n                    <div class=\"overlay-item\">HOME</div>\n                </div>\n                <span data-js=\"fourWeekChallengeBtn\" class=\"overlay-sibling\">4-Week Challenge</span>\n            </div>\n            <span data-js=\"hundredPointChallengeBtn\" class=\"header-item\">100-Point Challenge</span>\n            <span data-js=\"myBusBtn\" class=\"header-item\">My Bus</span>\n            <span data-js=\"getInvolvedBtn\" class=\"header-item\">Get Involved</span>\n            <span class=\"header-item\">Help</span>\n            <div class=\"header-item\">\n                <span data-js=\"inbox\" class=\"glyphicon glyphicon-envelope\"></span>\n                <span>Hi ";
  if (helper = helpers.firstName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.firstName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "!</span>\n                <span data-js=\"dropdownButton\" class=\"glyphicon glyphicon-chevron-down\"></span>\n                <div data-js=\"menu\" class=\"menu\">\n                    <div>Settings</div>\n                    <div data-js=\"logout\">Logout</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  })

});