define(["app"], function(app) {
	app.directive('mainPage', function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'src/system/layout/directives/paginator/page.html',
			scope: {
				page: '=page'
			}
		};
	});
});