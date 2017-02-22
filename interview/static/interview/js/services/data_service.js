/**
 * Created by afnan on 8/17/16.
 */
define(['app'], function(app){
   return app.factory('DataService', function($http){
       var candidates = [
           {
               'id': 1,
               'first_name': 'Afnan',
               'last_name': 'Nazir',
           },
           {
               'id': 2,
               'first_name': 'Hassan',
               'last_name': 'Al',
           },
       ];
       var factory = {};
       factory.getUsers = function() {
           return candidates;
       };
       return factory
   })
});