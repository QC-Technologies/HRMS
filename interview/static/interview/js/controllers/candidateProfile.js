/**
 * Created by afnan on 8/22/16.
 */
define([
    'app',
    'interview/js/services/candidateService',
    'interview/js/filters/sanitize'
], function (app) {
    app.controller('CandidateProfile', ['$scope','$mdDialog', '$sce', '$compile', 'Candidate', function ($scope, $md, $sce, $compile, candidateService) {
	$scope.activated = false;
        candidateService.getForm()
            .success(function(res){
                angular.element('#form').append($compile(res.form)($scope));
            })
            .error(function(data, status, headers, config){
                console.log(data);
            });
        $scope.renderHtml = function (htmlCode) {
	    return $sce.trustAsHtml(htmlCode);
        };
        $scope.submitForm = function(form) {
	    $scope.activated = true;
            var fd = new FormData(),
                data = $('#candidate_profile').serializeArray();
            $.each(data, function(key, input){
              fd.append(input.name, input.value)
            });
            fd.append('cv', document.getElementById("id_cv").files[0]);
            candidateService.saveForm(fd)
            .success(function(res){
		$scope.activated = false;
		var el = angular.element('#form');
		el.html('');
                el.append($compile(res.form)($scope));
		if (res.success) {
		    $md.show(
			$md.alert()
			.title('Candidate added successfully')
			.ok('OK'));
                }
            })
            .error(function(data, status, headers, config){
		$scope.activated = false;
                console.log(data);
            });
        }
    }]);
});
