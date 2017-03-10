/**
 * Created by afnan on 2/11/17.
 */

define([
    'app',
    'schedule_interview',
    'interview/js/services/candidate',
    'interview/js/filters/sanitize'
], function (app) {
    app.controller('CandidatesList', ['$scope', '$sce', '$uibModal', '$mdDialog', 'Candidate',
        function ($scope, $sce, $modal, $md, candidateService) {
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
            $md.show({
                templateUrl: $sce.trustAsResourceUrl(STATIC_URL + 'interview/templates/schedule-interview.html'),
                controller: 'ScheduleInterview',
                parent: angular.element(document.body),
		fullscreen: true,
                locals: {
                    candidate:  
                        candidate
                    
                }
            });
        }
    }]);
});
