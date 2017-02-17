/**
 * Created by afnan on 2/16/17.
 */
define(['app'], function(app){
    return app.factory('Interview', function($http){
        var factory = {};
        factory.scheduleInterview = function(data) {
            return $http.post(
                'schedule-interview/',
                data,
                {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
            );
        };
        factory.getInterviews = function() {
            return $http.get('interviews-list/');
        };
        return factory
    })
});
