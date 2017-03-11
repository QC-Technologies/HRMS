/**
 * Created by afnan on 2/11/17.
 */

define([
    'app',
    'schedule_interview',
    'interview/js/services/candidate',
    'interview/js/filters/sanitize'
], function (app) {
    app.controller('CandidatesList', ['$scope', '$sce', '$mdDialog', 'Candidate',
        function ($scope, $sce, $md, candidateService) {
	    $scope.data = {
		'candidates': []
	    };
	    $scope.maxSize = 5;
	    $scope.bigCurrentPage = 1;
	    $scope.bigTotalItems = 0;
	    $scope.perPage = 20;

	    $scope.getList = function () {
		var data = {
		    'perPage': $scope.perPage,
		    'page': $scope.bigCurrentPage
		}
		candidateService.getCandidates($.param(data))
		    .then(
			function(res) {
			    $scope.data.candidates = JSON.parse(res.data.data);
			    $scope.bigTotalItems = res.data.page.total;
			},
			function(data, status, headers, config) {
			    console.log(data);
			});
	    }
	    $scope.openScheduleView = function (candidate) {
		$md.show({
		    templateUrl: $sce.trustAsResourceUrl(STATIC_URL + 'interview/templates/schedule-interview.html'),
		    controller: 'ScheduleInterview',
		    parent: angular.element(document.body),
		    fullscreen: true,
		    locals: {candidate: candidate}
		});
	    }
	    $scope.pageChanged = function () {
		$scope.getList();
	    }    				
	    $scope.getList();
    }]);
});
