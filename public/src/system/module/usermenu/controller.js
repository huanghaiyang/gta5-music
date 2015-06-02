define(["app"], function(app) {
	app.controller("UsermenuController", ["$scope", "$location", "$route", "UserService",
		function($scope, $location, $route, UserService) {

			$scope.rootPath = "";
			$scope.loginUser = UserService.get({}, function() {});
			UserService.query({
				menus: 'menus'
			}, function(data) {
				function improveData(data) {
					for (var i = 0; i < data.length; i++) {
						/*根据浏览器地址打开对应的导航菜单*/
						/*#/home #/music*/
						if (data[i].hrefTarget && location.hash.match(/^#\/\w+/)[0] === data[i].hrefTarget) {
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
		}
	]);
});