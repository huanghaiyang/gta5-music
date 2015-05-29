define(["usermenu"], function(app) {
	app.controller("IndexController", ["$scope", "$location", "$route", "userService",
		function($scope, $location, $route, userService) {

			$scope.rootPath = "";
			$scope.loginUser = userService.get({}, function() {});
			userService.query({
				menus: 'menus'
			}, function(data) {
				function improveData(data) {
					for (var i = 0; i < data.length; i++) {
						/*根据浏览器地址打开对应的导航菜单*/
						if (data[i].hrefTarget && $scope.rootPath + '/web' + data[i].hrefTarget.replace(/\#(.*)$/, "") === location.pathname) {
							data[i].active = true;
						}
						if (data[i].children && data[i].children.length > 0) {
							improveData(data[i].children);
						}
					}
					return data;
				};
				if (data.$resolved === true) {
					$scope.menuData = improveData(data);
				}
			});
			/*当前路由不跳转*/
			var lastRoute = $route.current;
			$scope.$on('$locationChangeSuccess', function(event, next, nextParams) {
				$route.current = lastRoute;
			});
		}
	]);
});