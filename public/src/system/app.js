define(function() {
	return angular.module(
		'app', ['ngRoute', 'ngResource']).run(function($location) {
		$location.url("/home");
	});
});