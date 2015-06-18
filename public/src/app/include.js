/*模块定义*/
require.config({
	baseUrl: "/bower_components/",
	paths: {
		"jquery": "jquery/dist/jquery",
		"jquery.rotate": "../src/app/lib/jquery.rotate/jquery.rotate",

		"circle": "../src/app/circle",
		"app.index": "../src/app/index"
	},
	shim: {
		'jquery.rotate': {
			'deps': ['jquery']
		},
		'circle': {
			'deps': ['jquery', 'jquery.rotate']
		},
		'index': {
			'deps': ['jquery', 'circle']
		}
	},
	waitSeconds: 15
});
/*加载文件*/
require([
	'jquery', 'jquery.rotate', 'circle',
	'app.index'
], function(require) {
	'use strict';
});