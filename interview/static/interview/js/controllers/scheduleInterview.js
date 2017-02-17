/**
 * Created by afnan on 2/11/17.
 */
define([
    'app',
    'interview/js/services/interviewService',
], function (app) {
    app.controller('ScheduleInterview', ['$scope', '$uibModalInstance', 'Interview', 'candidate',
        function ($scope, $modalInstance, interviewService, candidate) {
            $scope.candidate= candidate;
            $scope.data = {
                'candidate_id': candidate.pk,
                'interview_id': '',
                'date': new Date,
                'time': new Date,
            };

            $scope.popup = {
                opened: false
            };
            $scope.dateOptions = {
                dateDisabled: $scope.disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            $scope.openCalendar = function() {
                $scope.popup.opened = true;
            };
            // Disable weekend selection
            $scope.disabled = function (data) {
                var date = data.date,
                mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            };
            $scope.scheduleInterview = function () {
               var data = $scope.data;
                debugger;
               data.date = data.date.toDateString();
               data.time = data.time.toTimeString();
               interviewService.scheduleInterview(data)
                    .then(
                        function(res){
                            console.log(res)
                        },
                        function(data){
                            console.log(data)
                        });
            };
            $scope.close = function () {
                $modalInstance.close();
            };

    }]);
});
