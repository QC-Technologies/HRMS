/**
 * Created by afnan on 8/16/16.
 */
require.config({
    baseUrl: STATIC_URL,
    paths: {
        'angular': 'js/angular.min',
        'angular-route': 'js/angular-route.min',
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
        'app': ['angular', 'bootstrap', 'ui-bootstrap'],
        'ui-bootstrap': ['bootstrap', 'angular'],
        'routes':['user', 'candidate_profile', 'candidates_list', 'interviews_list']
    }
});

require(['app'], function(app){
    require(['routes'], function() {
        app.init();
    });
});
