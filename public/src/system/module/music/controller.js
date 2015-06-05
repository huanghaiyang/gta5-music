define(["app"], function(app) {
	app.controller("MusicController", ["$scope", "$location", "$route", "Paginator", "MusicService",
		function($scope, $location, $route, Paginator, MusicService) {
			$scope.x = "x";
			$scope.page = Paginator({
				resource: MusicService
			});
			$scope.reset = function() {
				$scope.name = "";
				$scope.title = "";
				$scope.age = "";
				$scope.author = "";
				$scope.search();
			};
			$scope.search = function() {
				$scope.page.setParams({
					name: $scope.name,
					title: $scope.title,
					age: $scope.age,
					author: $scope.author
				});
				$scope.page.fresh();
			};
		}
	]);
});