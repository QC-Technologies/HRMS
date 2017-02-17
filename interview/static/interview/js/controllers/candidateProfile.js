/**
 * Created by afnan on 8/22/16.
 */
define([
    'app',
    'interview/js/services/candidate',
    'interview/js/filters/sanitize'
], function (app) {
    app.controller('CandidateProfile', ['$scope', 'Candidate', '$sce', function ($scope, candidateService, $sce) {
        $scope.form = '';
        candidateService.getForm()
            .success(function(res){
                $scope.form = res.form;
            })
            .error(function(data, status, headers, config){
                console.log(data);
            });
        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
        $scope.submitForm = function(form) {
            var fd = new FormData(),
                data = $('#candidate_profile').serializeArray();
            $.each(data, function(key, input){
              fd.append(input.name, input.value)
            });
            fd.append('cv', document.getElementById("id_cv").files[0]);
            candidateService.saveForm(fd)
            .success(function(res){
                $scope.form = res.form;
                if (res.success) {
                    alert('Success saving candidate!');
                }
            })
            .error(function(data, status, headers, config){
                console.log(data);
            });
        }
    }]);
});
