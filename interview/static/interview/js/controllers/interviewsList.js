
/**
 * Created by afnan on 2/22/17.
 */

define([
    'app',
    'interview/js/services/interviewService',
], function (app) {
    app.controller('InterviewsList', ['$scope', '$sce', '$uibModal', 'Interview',
        function ($scope, $sce, $modal, interviewService) {
        $scope.data = {
            'interviews': [],
	    'page': {'total': 175, 'number': 1, 'size': 2}
        };
	    $scope.maxSize = 5;
	    $scope.bigCurrentPage = 1;
	    $scope.bigTotalItems = 0;
	    $scope.perPage = 2;

	    $scope.getList = function (method) {
		data = {
			'perPage': $scope.perPage,
		    	'page': $scope.bigCurrentPage
		}
		interviewService.getInterviews(method, $.param(data))
		    .then(
			function(res){
			    $scope.data.interviews = res.data.data;
			    $scope.bigTotalItems = res.data.page.total; 

			},
			function(data, status, headers, config){
			    console.log(data);
			});
	    }
	    $scope.pageChanged = function () {
		$scope.getList('POST');
	    }    				
	    $scope.getList('POST');
    }]);
});
