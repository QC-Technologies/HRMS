/**
 * Created by afnan on 2/11/17.
 */
define([
    'app',
    'interview/js/services/interviewService',
], function (app) {
    app.controller('ScheduleInterview', ['$scope', '$mdDialog', 'Interview', 'candidate',
        function ($scope, $modalInstance, interviewService, candidate) {
            $scope.candidate = candidate;
	    $scope.today = new Date();
	    $scope.at = new Date();
	    $scope.dt = new Date();
	    $scope.activated = false;
            $scope.data = {
                'candidate_id': candidate.pk,
                'interview_id': '',
            };

            // Disable weekend selection
            $scope.daysSelectable = function (date) {
		day = date.getDay();
                return ([1, 2, 3, 4, 5].indexOf(day) !== -1);
            };
            $scope.scheduleInterview = function () {
               var data = $scope.data;
               data.date = $scope.dt;
               data.time = $scope.at;
		$scope.activated = true;
               interviewService.scheduleInterview(data)
                    .then(
                        function(res){
			    $scope.close();
			    $modalInstance.show(
			    	$modalInstance.alert()
				.title('Interview Scheduled')
				.ok('OK')
			    );
                        },
                        function(data){
			    $scope.activated = false;
                            console.log(data)
                        });
            };
            $scope.close = function () {
                $modalInstance.hide();
            };

    }]);
});
