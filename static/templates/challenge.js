define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"challenge-page\">\n    <div class=\"header\">4 Week Challenge</div>\n    <div class=\"challenge-container\">\n        <div class=\"col-md-12\">\n            <div class=\"challenge-header\">\n                <div data-js=\"challengeNumber\" class=\"number\"></div>\n                <div class=\"detail\">\n                    <span data-js=\"challengeTitle\" class=\"title\"></span>\n                    <span data-js=\"backButton\" class=\"back\">\n                        <span class=\"glyphicon glyphicon-hand-left\"></span>\n                        <span>Back</span>\n                    </span>\n                </div>\n            </div>\n            <div class=\"body\">\n\n                <div class=\"col-md-12\">\n                    <div class=\"description-header\">Challenge Description</div>\n                    <div data-js=\"description\" class=\"description\"></div>\n\n                    <div class=\"submission\">\n                        <div class=\"text\">\n                            <textarea rows=\"5\" placeholder=\"Type submission here...\"></textarea>\n                        </div>\n                        <div class=\"col-md-12\">\n                            <div class=\"bottom\">\n                                <span class=\"glyphicon glyphicon-picture\"></span>\n                                <span class=\"glyphicon glyphicon-facetime-video\"></span>\n                                <span class=\"filename\"></span>\n                                <button class=\"submit\">Submit</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"bus-mates-header\">Submissions</div>\n    <div data-js=\"busMatesContainer\" class=\"bus-mates-container\"></div>\n</div>\n";
  })

});