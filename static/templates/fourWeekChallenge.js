define(['handlebars.runtime'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row\">\n    <div class=\"col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1\">\n        <div class=\"row header\">4 Week Challenge</div>\n        <div class=\"leaderboard-container\">\n            <div class=\"leaderboard-header\">4-Week Challenge Leaderboard</div>\n            <div class=\"leaderboard-sub-header\">Points</div>\n            <div data-js=\"leaderboardItems\" class=\"leaderboard-item-container\"></div>\n        </div>\n        <div class=\"leaderboard-footer\">\n            <span data-js=\"viewFullLeaderboardBtn\">View Full Leaderboard</span>\n        </div>\n        <div data-js=\"pastChallengeContainer\" class=\"row past-challenge-container\"></div>\n        <div data-js=\"challengeContainer\" class=\"row challenge-container\"></div>\n        <div class=\"challenge-footer\">\n            <span data-js=\"viewPastChallengeButton\">View Past Challenges</span>\n        </div>\n        <div class=\"bus-mates-container\">\n            <div data-js=\"busMatesHeader\" class=\"bus-mates-header\"></div>\n            <div data-js=\"busMatesItemContainer\" class=\"bus-mates-item-container\"></div>\n        </div>\n    </div>\n</div>\n";
  })

});