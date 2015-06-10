define(["app", "fun"], function(app, Fun) {
	app.controller("MusicController", ["$scope", "$location", "Paginator", "MusicService",
		function($scope, $location, Paginator, MusicService) {
			$scope.page = Paginator({
				resource: MusicService
			});
			$scope.reset = function() {
				$scope.name = "";
				$scope.title = "";
				$scope.year = "";
				$scope.artist = "";
				$scope.search();
			};
			$scope.search = function() {
				$scope.page.setParams({
					name: $scope.name,
					title: $scope.title,
					year: $scope.year,
					artist: $scope.artist
				});
				$scope.page.fresh();
			};
			$scope.delete = function(id) {
				Fun.msg.delConfirm(function() {
					MusicService.delete({
						id: id
					}, function(result) {
						Fun.msg.notify(result);
						$scope.reset();
					});
				});
			};
			$scope.update = function(id) {
				$location.url("/music/edit?id=" + id);
			};
			$scope.showResource = function(id) {
				$location.url("/music/mp3?id=" + id);
			};
		}
	]).controller("MusicInfoController", ["$rootScope", "$scope", "$location", "MusicService",
		function($rootScope, $scope, $location, MusicService) {
			var module = $rootScope.module;

			$scope.music = MusicService.get({
				id: $location.$$search.id
			});
			$scope.save = function() {
				if (module === "music/new")
					MusicService.save($scope.music, function(result) {
						Fun.msg.notify(result);
						$location.path("/music");
					});
				else if (module === "music/edit")
					MusicService.update($scope.music, function(result) {
						Fun.msg.notify(result);
						$location.path("/music");
					});
			}
		}
	]).controller("MusicResouceController", ["$rootScope", "$scope", "$location", "MusicService",
		function($rootScope, $scope, $location, MusicService) {
			$scope.music = MusicService.getSimple({
				id: $location.$$search.id,
				simple: 'simple'
			}).$promise.then(function(result) {
				createjs.Sound.alternateExtensions = ["mp3"];
				createjs.Sound.on("fileload", loadHandler);
				createjs.Sound.registerSound("http://localhost:3002/" + encodeURIComponent(result.path), "sound");
			});

			function loadHandler(event) {
				// This is fired for each sound that is registered.
				var instance = createjs.Sound.play("sound"); // play using id.  Could also use full sourcepath or event.src.
				instance.on("complete", function() {});
				instance.volume = 0.5;
			}
		}
	]);
});