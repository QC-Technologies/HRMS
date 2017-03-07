/**
 * Created by afnan on 2/11/17.
 */

define([
    'app',
    'schedule_interview',
    'interview/js/services/candidate',
    'interview/js/filters/sanitize'
], function (app) {
    app.controller('CandidatesList', ['$scope', '$sce', '$uibModal', 'Candidate',
        function ($scope, $sce, $modal, candidateService) {
        $scope.data = {
            'candidates': []
        };
        candidateService.getCandidates()
            .success(function(res){
                $scope.data.candidates = JSON.parse(res.data);
            })
            .error(function(data, status, headers, config){
                console.log(data);
            });
        $scope.openScheduleView = function (candidate) {
            $modal.open({
                animation: true,
                templateUrl: $sce.trustAsResourceUrl(STATIC_URL + 'interview/templates/schedule-interview.html'),
                controller: 'ScheduleInterview',
                size: 'lg',
                resolve: {
                    candidate: function () {
                        return candidate;
                    }
                }
            });
        }
    }]);
});
