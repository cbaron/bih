define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "<span data-js=\"monthDropdownButton\" class=\"glyphicon glyphicon-chevron-down\"></span>";
  }

function program3(depth0,data) {
  
  
  return "<span data-js=\"dayDropdownButton\" class=\"glyphicon glyphicon-chevron-down\"></span>";
  }

function program5(depth0,data) {
  
  
  return "<span data-js=\"yearDropdownButton\" class=\"glyphicon glyphicon-chevron-down\"></span>";
  }

  buffer += "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-1\"></div>\n        <div class=\"col-md-10 welcome-container\">\n            <div class=\"row welcome-header\">Welcome, ";
  if (helper = helpers.firstName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.firstName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "!</div>\n            <div class=\"row welcome-sub-header\">Join Bus (number) and win a trip back to Israel!</div>\n            <div class=\"row\">\n                <div class=\"col-md-1\"></div>\n                <div class=\"col-md-3\">\n                    <div data-js=\"uploadPhotoBtn\" class=\"upload-photo-btn-wrapper\">\n                        <div data-js=\"uploadPhotoBtn\" class=\"upload-photo-btn\">\n                            <div>Upload Photo</div>\n                        </div>\n                    </div>\n                    <div data-js=\"photo\" class=\"photo\"></div>\n                </div>\n                <div class=\"col-md-7\">\n                    <form class=\"form-horizontal\" role=\"form\">\n                        <div class=\"form-group\">\n                            <label for=\"name\" class=\"col-md-2 control-label\">Name</label>\n                            <div class=\"col-md-10\">\n                                <input type=\"text\" class=\"form-control\" id=\"name\" value=\"";
  if (helper = helpers.firstName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.firstName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.lastName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.lastName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" readonly>\n                            </div>\n                        </div>\n                        <div class=\"form-group birthday\">\n                            <label for=\"birthday\" class=\"col-md-2 control-label\">Birthday</label>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\" class=\"form-control\" id=\"birthday\" placeholder=\"Month\">";
  stack1 = helpers['if'].call(depth0, true, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                            <div class=\"col-md-3\">\n                                <input type=\"text\" class=\"form-control\" id=\"day\" placeholder=\"Day\">";
  stack1 = helpers['if'].call(depth0, true, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                            <div class=\"col-md-3\">\n                                <input type=\"text\" class=\"form-control\" id=\"year\" placeholder=\"Year\">";
  stack1 = helpers['if'].call(depth0, true, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label for=\"email\" class=\"col-md-2 control-label\">Email</label>\n                            <div class=\"col-md-10\">\n                                <input type=\"text\" class=\"form-control\" id=\"email\" value=\"";
  if (helper = helpers.emailAddress) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailAddress); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" readonly>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label for=\"phone\" class=\"col-md-2 control-label\">Phone</label>\n                            <div class=\"col-md-10\">\n                                <input type=\"text\" class=\"form-control\" id=\"phone\" value=\"";
  if (helper = helpers.phoneNumber) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.phoneNumber); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"(222) 555-5555\">\n                            </div>\n                        </div>\n                    </form>\n                </div>\n                <div class=\"col-md-1\"></div>\n            </div>\n        </div>\n        <div class=\"col-md-1\"></div>\n    </div>\n</div>\n";
  return buffer;
  })

});