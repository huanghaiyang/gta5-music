define(["app"], function(app) {
	app.controller("AppController", ["$scope", "$location", "$route",
		function($scope, $location, $route) {
			$scope.module = $location.path().replace(/^\//, "");
			/*当前路由不跳转*/
            var lastRoute = $route.current;
            $scope.$on('$locationChangeSuccess', function (event, next, nextParams) {
                $route.current = lastRoute;
            });
		}
	]);
});