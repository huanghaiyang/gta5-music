/*author: huanghaiyang*/
define(["app"], function(app) {
	app.directive("fakePage", ["$sce", "$templateRequest",
		function($sce, $templateRequest) {
			return {
				restrict: "E",
				scope: {
					link: "@"
				},
				replace: true,
				template: "<div></div>",
				link: function(scope, element, attrs) {
					var templateUrl = scope.link;
					templateUrl = $sce.getTrustedResourceUrl(templateUrl);
					if (angular.isDefined(templateUrl)) {
						$templateRequest(templateUrl).then(function(template) {
							element.html(template);
						});
					}
				}
			};
		}
	]);
});