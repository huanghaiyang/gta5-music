define(function() {
	return angular.module(
		'app', ['ngRoute', 'ngResource']).run(function($location) {
		if ($location.path() === "")
			$location.url("/home");
	});
});