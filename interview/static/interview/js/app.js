/**
 * Created by afnan on 8/11/16.
 */
define(['require', 'angular-route'], function(require){
    var app =  angular.module('interview', ['ngRoute', 'ui.bootstrap', 'ngMaterial']);
    app.init = function(){
        angular.bootstrap(document, ['interview']);
    };

    app.config(["$httpProvider", function ($httpProvider) {
        'use strict';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }]);

    return app;
});
