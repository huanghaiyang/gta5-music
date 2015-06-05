/*author: huanghaiyang*/
define(["app"], function(app) {
	app.directive("fakePage", ["$sce", "$templateRequest", "$compile",
		function($sce, $templateRequest, $compile) {
			return {
				restrict: "E",
				scope: true,
				replace: true,
				template: "<div></div>",
				link: function(scope, element, attrs) {
					var templateUrl = attrs.link;
					templateUrl = $sce.getTrustedResourceUrl(templateUrl);
					if (angular.isDefined(templateUrl)) {
						$templateRequest(templateUrl).then(function(template) {
							element.append($compile(template)(scope));
						});
					}
				}
			};
		}
	]);
});