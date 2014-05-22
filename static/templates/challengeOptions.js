define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <div class=\"option-row\">\n                        <div class=\"image\">\n                            <img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageUrl)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                        </div>\n                        <div class=\"detail\">\n                            <div class=\"header\">\n                                <span class=\"name\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n                                <button data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-js=\"selectBtn\" class=\"select-btn\">SELECT</button>\n                            </div>\n                            <div class=\"rules\">";
  if (helper = helpers.rules) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rules); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n                        </div>\n                    </div>\n                ";
  return buffer;
  }

  buffer += "<div class=\"header\">100 Point Challenge</div>\n<div class=\"challenge-container\">\n    <div class=\"col-md-12\">\n        <div class=\"sub-header\">Challenge Description</div>\n        <div class=\"rules\">The 100 Point Challenge is a unique opportunity to explore your Judaism, strengthen your connection to Israel, and learn about opportunities to engage with your localcommunity. The 100 point challenge is a self guided journey that is personalized, fun, and meaningful. You, the participant, choose your incentive challenge, determine what activities to complete, and set the pace you wish to complete the challenge. Step 1: Choose your incentive from the options presented below, and fill out the enrollment form. You will receive a notification from Bring Israel Home informing you whether you have been accepted into that incentive challenge*. Step2: You will have 3 months from the challenge start date to complete 100 points worth of challenge activities. Bring Israel Home will provide a list of proposed challenges; with each challenge having an assigned point value. You may also suggest your own challenge, and if approved it will be added to your challenge list with a point value assigned by Bring Israel Home. Proof of completion of challenges is submitted through the Bring Israel Home website via a written post, picture, or video; method of submission will be outlined in the challenge description. You may complete challenges multiple times subject to specific challenge limitations e.g. you may attend multiple classes, but you may only light Shabbat candles 1x per week.  Step 3: Bring Israel Home will verify all your challenge submissions, and upon confirmation that you have completed your 100 points, you will be contacted with information on how to redeem your points.* Note: some incentives may have additional restrictions based on partnering organizations policy. If at the time for redeeming the prize you become ineligible or cannot redeem the incentive, it is the discretion of Bring Israel Home whether to offer you the option to redeem your points for another incentive.</div>\n        <div class=\"option-list\">\n            <div class=\"col-md-12\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  })

});