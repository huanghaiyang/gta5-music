define(["app"], function(app) {
	'use strict';
	app.config(
		function($routeProvider, $locationProvider) {
			var app = {
				templateUrl: "src/system/app.html",
				controller: 'AppController'
			};
			$routeProvider.when("/:path/:hash", app);

		});
});