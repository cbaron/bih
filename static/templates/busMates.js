define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div data-type=\"busMate\" data-js=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"bus-mate-row hidden-xs hidden-sm\">\n        <div class=\"image col-md-1\">\n            <img data-js=\"image\" src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.profileImage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n        </div>\n        <div class=\"bus-mate-detail col-md-11\">\n            <span class=\"glyphicon glyphicon-comment hide\" data-js=\"messageBtn\"></span>\n            <span data-js=\"name\" class=\"col-md-3 name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.lastName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"vote-off hide glyphicon glyphicon-thumbs-down\" data-js=\"voteOffBtn\"></span>\n            <span class=\"badge-container\" data-js=\"badgeContainer\"></span>\n        </div>\n        \n        <div class=\"clearfix hide\">\n            <div class=\"col-md-2\"></div>\n            <div class=\"detail-container\" data-js=\"detailContainer\"></div>\n        </div>\n    </div>\n    <div data-type=\"busMate\" data-js=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"bus-mate-row visible-xs visible-sm\">\n        <div class=\"image col-xs-1 col-sm-1\">\n            <img data-js=\"image\" src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.profileImage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n        </div>\n        <div class=\"bus-mate-detail col-xs-11 col-sm-11\">\n            <div class=\"row\">\n                <div class=\"col-xs-2 col-sm-2\">    \n                    <span class=\"glyphicon glyphicon-comment hide\" data-js=\"messageBtn\"></span>\n                 </div>\n                <div data-js=\"name\" class=\"col-xs-5 col-sm-5 name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.lastName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                <span class=\"vote-off hide glyphicon glyphicon-thumbs-down\" data-js=\"voteOffBtn\"></span>\n                <div class=\"col-xs-5 col-sm-5 badge-container\" data-js=\"badgeContainer\"></div>\n            </div>\n        </div>\n        <div class=\"clearfix hide\">\n            <div class=\"col-md-2\"></div>\n            <div class=\"detail-container\" data-js=\"detailContainer\"></div>\n        </div>\n    </div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.busMates), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  })

});