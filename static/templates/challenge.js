define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"challenge-page\">\n    <div class=\"col-md-12\">\n        <div class=\"header\">4 Week Challenge</div>\n        <div class=\"challenge-container\">\n            <div class=\"col-md-12\">\n                <div class=\"header\">\n                    <div data-js=\"challengeNumber\" class=\"number\"></div>\n                    <div class=\"detail\">\n                        <div data-js=\"challengeTitle\" class=\"title\"></div>\n                        <div data-js=\"backButton\" class=\"back\"></div>\n                    </div>\n                </div>\n                <div class=\"body\">\n                    <div class=\"col-md-12\">\n                        <div class=\"header\">Challenge Description</div>\n                        <div data-js=\"description\" class=\"description\"></div>\n                    </div>\n                </div>\n                <div class=\"submission\">\n                    <div class=\"col-md-12\">\n                        <div class=\"text\">\n                            <textarea placeholder=\"Type submission here...\"></textarea>\n                        </div>\n                        <div class=\"bottom\">\n                            <div class=\"photo\"></div>\n                            <div class=\"video\"></div>\n                            <div class=\"filename\"></div>\n                            <button class=\"submit\"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"bus-mates-header\">Submissions</div>\n        <div data-js=\"busMatesContainer\" class=\"bus-mates-container\"></div>\n    </div>\n</div>\n";
  })

});