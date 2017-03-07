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
        factory.getInterviews = function(method, data) {
	    if (typeof method == undefined) {
	    	method = 'GET';
	    }
	    if (typeof data == undefined ) {
	    	data = {};
	    }
	    return $http({
	    	url: 'interviews-list/',
		method: method,
		data: data,
		headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	    })
        };
        return factory
    })
});
