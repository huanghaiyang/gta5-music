define(['app'], function(app) {
	app.directive('ribbon', function() {
		return {
			restrict: 'E',
			replace: true,
			template: '<div id="ribbon">\n' +
				'          <span class="ribbon-button-alignment">\n' +
				'      			<span class="btn btn-ribbon">\n' +
				'					<i class="fa fa-refresh"></i>\n' +
				'				</span>\n' +
				'			</span>\n' +
				'			<!-- breadcrumb -->\n' +
				'			<ol class="breadcrumb">\n' +
				'			</ol>\n' +
				'			<!-- end breadcrumb -->\n' +
				'		</div>\n',
			link: function(scope, element, attrs) {

			}
		};
	});
});