define(["app", "fun"], function(app, Fun) {
	app.controller("MusicController", ["$scope", "$location", "Paginator", "MusicService",
		function($scope, $location, Paginator, MusicService) {
			$scope.page = Paginator({
				resource: MusicService
			});
			$scope.reset = function() {
				$scope.name = "";
				$scope.title = "";
				$scope.age = "";
				$scope.artist = "";
				$scope.search();
			};
			$scope.search = function() {
				$scope.page.setParams({
					name: $scope.name,
					title: $scope.title,
					age: $scope.age,
					artist: $scope.artist
				});
				$scope.page.fresh();
			};
		}
	]).controller("MusicNewController", ["$scope", "$location", "$route", "MusicService",
		function($scope, $location, $route, MusicService) {
			$scope.save = function() {
				MusicService.save($scope.music, function(result) {
					Fun.msg.notify(result);
					$location.path("/music");
				});
			}
		}
	]);
});