define(["app"], function(app) {
    'use strict';
    app.config(
        function($routeProvider, $locationProvider) {
            var index = {
                templateUrl: "src/system/index.html",
                controller: 'IndexController'
            };
            $routeProvider.when("/", index).when('/index', index);

        });
});