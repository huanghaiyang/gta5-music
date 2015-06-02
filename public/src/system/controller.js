define(["app"], function(app) {
	app.controller("AppController", ["$scope", "$location", "$route",
		function($scope, $location, $route) {
			$scope.$on("$routeChangeSuccess", function(event, next, nextp) {
				$scope.module = $location.path().replace(/^\//, "");
			});
		}
	]);
});