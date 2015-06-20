/*模块定义*/
require.config({
	baseUrl: "/bower_components/",
	paths: {
		"jquery": "jquery/dist/jquery",
		"jquery.rotate": "../src/app/lib/jquery.rotate/jquery.rotate",
		"jquery-circle-progress": "jquery-circle-progress/dist/circle-progress",

		"circle": "../src/app/circle",
		"app.index": "../src/app/index",

		'PreloadJS': 'PreloadJS/lib/preloadjs-0.6.1.combined',
		'SoundJS': 'SoundJS/lib/soundjs-0.6.1.combined'
	},
	shim: {
		'jquery.rotate': {
			'deps': ['jquery']
		},
		'jquery-circle-progress': {
			'deps': ['jquery']
		},
		'circle': {
			'deps': ['jquery', 'jquery.rotate']
		},
		'app.index': {
			'deps': ['jquery', 'circle']
		}
	},
	waitSeconds: 15
});
/*加载文件*/
require([
	'jquery', 'jquery.rotate', 'jquery-circle-progress', 'circle', 'PreloadJS', 'SoundJS',
	'app.index'
], function(require) {
	'use strict';
});