define(function() {
	var app = angular.module(
		'app', ['ngRoute', 'ngResource', 'ngFabForm']).run(function($location) {
		$location.path("/index");
	});
	return app;
});