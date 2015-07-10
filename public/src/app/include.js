/*模块定义*/
require.config({
	baseUrl: "/bower_components/",
	paths: {
		"jquery": "jquery/dist/jquery",
		"jquery.rotate": "../src/app/lib/jquery.rotate/jquery.rotate",
		"jquery.easing": "jquery-easing/jquery.easing",
		"velocity": "velocity/velocity.min",
		"jquery-circle-progress": "jquery-circle-progress/dist/circle-progress",

		"async": "async/lib/async",

		"music": "../src/app/music",
		"app.index": "../src/app/index",

		'PreloadJS': 'PreloadJS/lib/preloadjs-0.6.1.combined',
		'SoundJS': 'SoundJS/lib/soundjs-0.6.1.combined',

		'Vague': 'Vague.js/Vague'
	},
	shim: {
		'jquery.rotate': {
			'deps': ['jquery']
		},
		'jquery.easing': {
			'deps': ['jquery']
		},
		'velocity': {
			'deps': ['jquery']
		},
		'jquery-circle-progress': {
			'deps': ['jquery']
		},
		'Vague': {
			'deps': ['jquery']
		},
		'music': {
			'deps': ['jquery', 'jquery.rotate', 'jquery.easing', 'async']
		},
		'app.index': {
			'deps': ['jquery', 'music']
		}
	},
	waitSeconds: 15
});
/*加载文件*/
require([
	'jquery', 'jquery.rotate', 'jquery.easing', 'velocity', 'async', 'jquery-circle-progress', 'Vague', 'music', 'PreloadJS', 'SoundJS',
	'app.index'
], function(require) {
	'use strict';
});