/**
 * Created by afnan on 8/16/16.
 */
require.config({
    baseUrl: STATIC_URL,
    paths: {
        'angular': 'js/angular.min',
        'angular-route': 'js/angular-route.min',
        'angular-animate': 'js/angular-animate.min',
        'angular-area': 'js/angular-area.min',
	'angular-material': 'js/angular-material.min',
        'bootstrap': 'js/bootstrap.min',
        'ui-bootstrap': 'js/ui-bootstrap-tpls-2.5.0.min',
        'app': 'interview/js/app',
        'routes': 'interview/js/routes',
        'user': 'interview/js/controllers/user',
        'candidate_profile': 'interview/js/controllers/candidateProfile',
        'candidates_list': 'interview/js/controllers/candidatesList',
        'interviews_list': 'interview/js/controllers/interviewsList',
        'schedule_interview': 'interview/js/controllers/scheduleInterview',
    },
    shim: {
        'angular': {
          exports: 'angular '
        },
        'app': ['angular','angular-animate', 'angular-area', 'angular-material', 'bootstrap', 'ui-bootstrap'],
	'angular-animate': ['angular'],
	'angular-area': ['angular'],
	'angular-material': ['angular', 'angular-animate', 'angular-area'],
        'ui-bootstrap': ['bootstrap', 'angular'],
        'routes':['user', 'candidate_profile', 'candidates_list', 'interviews_list']
    }
});

require(['app'], function(app){
    require(['routes'], function() {
        app.init();
    });
});
