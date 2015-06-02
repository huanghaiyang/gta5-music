define(function() {
	return angular.module(
		'app', ['ngRoute', 'ngResource', 'ngFabForm']).run(function($location) {
		if ($location.path() === "")
			$location.url("/home");
	});
});