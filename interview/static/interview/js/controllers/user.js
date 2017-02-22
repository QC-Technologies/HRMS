/**
 * Created by afnan on 8/19/16.
 */
define(['app', 'interview/js/services/data_service'], function (app) {
    app.controller('User', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.user = 'First Candidate';
    }]);
});
