/*模块定义*/
require.config({
	baseUrl: "/bower_components/",
	paths: {
		"es6-shim": 'es6-shim/es6-shim.min',
		"jquery": "jquery/dist/jquery",
		"jquery.easing": "jquery-easing/jquery.easing",
		"velocity": "velocity/velocity.min",
		"jquery-ui": "jquery-ui/jquery-ui.min",

		"async": "async/lib/async",
		"list": "../src/app/list",
		"app.index": "../src/app/index"
	},
	shim: {
		'jquery.easing': {
			'deps': ['jquery']
		},
		'jquery-ui': {
			'deps': ['jquery']
		},
		'velocity': {
			'deps': ['jquery']
		},
		'list': {
			'deps': ['jquery', 'jquery.easing', 'async']
		}
	},
	waitSeconds: 15
});
/*加载文件*/
require([
	'es6-shim', 'jquery', 'jquery.easing', 'jquery-ui', 'velocity', 'async', 'list'
], function(require) {
	'use strict';
});