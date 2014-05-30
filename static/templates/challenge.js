define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"header\">4 Week Challenge</div>\n<div class=\"challenge-container\">\n    <div class=\"col-md-12 col-md-offset-0 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1\">\n        <div class=\"challenge-header\">\n            <div data-js=\"challengeNumber\" class=\"number\"></div>\n            <div class=\"detail\">\n                <span data-js=\"challengeTitle\" class=\"title\"></span>\n                <span data-js=\"backBtn\" class=\"back\">\n                    <span class=\"glyphicon glyphicon-hand-left\"></span>\n                    <span>Back</span>\n                </span>\n            </div>\n        </div>\n        <div class=\"body\">\n\n            <div class=\"col-md-12 \">\n                <div class=\"description-header\">Challenge Description</div>\n                <div data-js=\"description\" class=\"description\"></div>\n\n                <div data-js=\"submission\" class=\"submission\">\n                    <div class=\"text\">\n                        <textarea data-js=\"text\" rows=\"5\" placeholder=\"Type submission here...\"></textarea>\n                    </div>\n                    <div class=\"col-md-12\">\n                        <div class=\"bottom\">\n                            <div class=\"col-md-2 col-sm-2 col-xs-2 rightBorder noPad\">\n                                <span data-js=\"image\" class=\"glyphicon glyphicon-picture\"></span>\n                            </div>\n                            <div class=\"col-md-2 col-sm-2 col-xs-2 rightBorder noPad\">\n                                <span data-js=\"video\" class=\"glyphicon glyphicon-facetime-video\"></span>\n                            </div>\n                            <div class=\"col-md-6 col-sm-6 col-xs-6 noPad\">\n                                <span class=\"filename\" data-js=\"mediaReference\"></span>\n                            </div>\n                            <div class=\"col-md-2 col-sm-2 col-xs-2 noPad\">\n                                <button data-js=\"submitBtn\" class=\"submit\">Submit</button>\n                                <input data-js=\"imageUpload\" class=\"file-upload\" id=\"imageUpload\" type=\"file\" name=\"files[]\" data-url=\"/submission/post\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1\">\n        <div class=\"bus-mates-header\">Submissions</div>\n        <div class=\"clearfix\">\n            <div data-js=\"busMatesContainer\" class=\"bus-mates-container\"></div>\n        </div>\n    <div>\n</div>\n";
  })

});