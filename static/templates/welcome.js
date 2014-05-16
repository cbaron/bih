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

  buffer += "<div class=\"row\">\n    <div class=\"col-md-1\"></div>\n    <div class=\"col-md-10 welcome-container\">\n        <div class=\"row welcome-header\">Welcome, ";
  if (helper = helpers.firstName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.firstName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "!</div>\n        <div class=\"row welcome-sub-header\">Join Bus ";
  if (helper = helpers.busName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.busName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " and win a trip back to Israel!</div>\n        <div class=\"row\">\n            <div class=\"col-md-3\">\n                <div data-js=\"uploadPhotoBtnWrapper\" class=\"upload-photo-btn-wrapper\">\n                    <div data-js=\"uploadPhotoBtn\" class=\"upload-photo-btn\">\n                        <div>Upload Photo</div>\n                    </div>\n                </div>\n                <input data-js=\"profileImageUpload\" class=\"file-upload\" id=\"profileImageUpload\" type=\"file\" name=\"files[]\" data-url=\"/profileImage/post\">\n            </div>\n            <div class=\"col-md-9\">\n                <form class=\"form-horizontal\" role=\"form\">\n                    <div class=\"form-group\">\n                        <label for=\"name\" class=\"col-md-2 control-label\">Name</label>\n                        <div class=\"col-md-10\">\n                            <input type=\"text\" class=\"form-control\" id=\"name\" value=\"";
  if (helper = helpers.firstName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.firstName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.lastName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.lastName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" readonly>\n                        </div>\n                    </div>\n                    <div class=\"form-group birthday\">\n                        <label for=\"month\" class=\"col-md-2 control-label\">Birthday</label>\n                        <div class=\"col-md-4 dropdown\">\n                            <a id=\"month\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n                                <input data-js=\"month\" type=\"text\" class=\"form-control\" id=\"month\" placeholder=\"Month\" readonly>";
  stack1 = helpers['if'].call(depth0, true, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n                            <ul data-js=\"dropdownMenu\" data-input=\"month\" class=\"dropdown-menu month\" role=\"menu\" aria-labelledby=\"month\">\n                                <li>January</li>\n                                <li>February</li>\n                                <li>March</li>\n                                <li>April</li>\n                                <li>May</li>\n                                <li>June</li>\n                                <li>July</li>\n                                <li>August</li>\n                                <li>September</li>\n                                <li>October</li>\n                                <li>November</li>\n                                <li>December</li>\n                            </ul>\n                        </div>\n                        <div class=\"col-md-3 dropdown\">\n                            <a id=\"day\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n                                <input type=\"text\" class=\"form-control\" data-js=\"day\" placeholder=\"Day\">";
  stack1 = helpers['if'].call(depth0, true, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n                            <ul data-js=\"dropdownMenu\" data-input=\"day\" class=\"dropdown-menu day\" role=\"menu\">\n                                <li>1</li>\n                                <li>2</li>\n                                <li>3</li>\n                                <li>4</li>\n                                <li>5</li>\n                                <li>6</li>\n                                <li>7</li>\n                                <li>8</li>\n                                <li>9</li>\n                                <li>10</li>\n                                <li>11</li>\n                                <li>12</li>\n                                <li>13</li>\n                                <li>14</li>\n                                <li>15</li>\n                                <li>16</li>\n                                <li>17</li>\n                                <li>18</li>\n                                <li>19</li>\n                                <li>20</li>\n                                <li>21</li>\n                                <li>22</li>\n                                <li>23</li>\n                                <li>24</li>\n                                <li>25</li>\n                                <li>26</li>\n                                <li>27</li>\n                                <li>28</li>\n                                <li>29</li>\n                                <li>30</li>\n                                <li>31</li>\n                            </ul>\n                        </div>\n                        <div class=\"col-md-3 dropdown\">\n                            <a id=\"year\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n                                <input type=\"text\" class=\"form-control\" data-js=\"year\" placeholder=\"Year\">";
  stack1 = helpers['if'].call(depth0, true, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n                            <ul data-js=\"dropdownMenu\" data-input=\"year\" class=\"dropdown-menu year\" role=\"menu\">\n                            <li>2005</li>\n                            <li>2004</li>\n                            <li>2003</li>\n                            <li>2002</li>\n                            <li>2001</li>\n                            <li>2000</li>\n                            <li>1999</li>\n                            <li>1998</li>\n                            <li>1997</li>\n                            <li>1996</li>\n                            <li>1995</li>\n                            <li>1994</li>\n                            <li>1993</li>\n                            <li>1992</li>\n                            <li>1991</li>\n                            <li>1990</li>\n                            <li>1989</li>\n                            <li>1988</li>\n                            <li>1987</li>\n                            <li>1986</li>\n                            <li>1985</li>\n                            <li>1984</li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"email\" class=\"col-md-2 control-label\">Email</label>\n                        <div class=\"col-md-10\">\n                            <input type=\"text\" class=\"form-control\" id=\"email\" value=\"";
  if (helper = helpers.emailAddress) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailAddress); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" readonly>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"phone\" class=\"col-md-2 control-label\">Phone</label>\n                        <div class=\"col-md-10\">\n                            <input type=\"text\" class=\"form-control\" id=\"phone\" value=\"";
  if (helper = helpers.phoneNumber) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.phoneNumber); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"(222) 555-5555\">\n                        </div>\n                    </div>\n                </form>\n            </div>\n            <div class=\"col-md-1\"></div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-11 submit-col\">\n                <button data-js=\"submitButton\" class=\"btn\">Submit</div>\n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  })

});