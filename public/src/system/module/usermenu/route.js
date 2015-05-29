define(["usermenu"], function(app) {
    'use strict';
    app.config(
        function($routeProvider, $locationProvider) {
            var index = {
                templateUrl: "src/system/module/usermenu/index.html",
                controller: 'IndexController'
            };
            $routeProvider.when("/:path", index);

        });
});