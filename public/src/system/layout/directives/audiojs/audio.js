define(['app'], function(app) {
	app.directive('audioJ', ['$timeout',
		function($timeout) {
			return {
				restrict: "E",
				replace: true,
				template　: '<audio src="{{path}}" preload="false" a-tag/>',
				scope: {
					callback: '&',
					path: '='
				},
				link: function(scope, element, attrs) {
					var timer = $timeout(function() {
						if ($('audio[a-tag]').length > 0) {
							if (scope.callback) {
								scope.callback();
								timer = null;
							}
						}
					}, 100);
				}
			};
		}
	]);
});