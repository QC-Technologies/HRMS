/**
 * Created by afnan on 8/22/16.
 */
define(['app'], function(app){
   return app.factory('Candidate', function($http){
       var factory = {};
       factory.getForm = function() {
           return $http.get("profile/");
       };
       factory.saveForm = function(form) {
           return $http.post(
               "profile/",
               form,
               {transformRequest: angular.identity,
                   headers:{'Content-Type': undefined}}
               );
       };
       factory.getCandidates = function(data) {
	   return $http({
	       url: 'candidates-list/',
	       method: 'POST',
	       data: data,
	       headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	   })
       };
       return factory
   })
});
