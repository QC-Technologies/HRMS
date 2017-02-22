/**
 * Created by afnan on 8/22/16.
 */
define(['app'], function(app){
    app.filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
});
