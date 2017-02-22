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
       factory.getCandidates = function() {
           return $http.get("candidates-list/");
       };
       return factory
   })
});
