define(function() {
	return angular.module(
		'app', ['ngRoute', 'ngResource', 'ngFabForm']).run(function($location) {
		$location.path("/index");
	});
});