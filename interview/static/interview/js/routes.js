/**
 * Created by afnan on 8/13/16.
 */
'use strict';

define([
		'app'
    ],

	function (app) {

		return app.config(['$routeProvider',function ($routeProvider) {
              $routeProvider
                  .when("/main/", {
                    templateUrl : STATIC_URL + "interview/templates/main.html",
                      controller: 'User'
                  })
                  .when("/candidate-profile/", {
                    templateUrl : STATIC_URL + "interview/templates/candidate-profile.html",
                      controller: 'CandidateProfile'
                  })
                  .when("/candidates/", {
                      templateUrl : STATIC_URL + "interview/templates/candidates-list.html",
                      controller: 'CandidatesList'
                  })
                  .otherwise({ redirectTo: '/main/' });
		}]);
});
