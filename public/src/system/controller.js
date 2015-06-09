define(["app", "fun"], function(app, Fun) {
	app.controller("AppController", ["$rootScope", "$scope", "$location", "$route",
		function($rootScope, $scope, $location, $route) {
			$rootScope.module = $scope.module = Fun.angular.location.getModule($location);
			/*当前路由不跳转*/
			var lastRoute = $route.current;
			$scope.$on('$locationChangeSuccess', function(event, next, nextParams) {
				$route.current = lastRoute;
				$rootScope.module = $scope.module = Fun.angular.location.getModule($location);
			});
		}
	]);
});