/*模块定义*/
require.config({
	baseUrl: "/bower_components/",
	paths: {
		"es6-shim": 'es6-shim/es6-shim.min',
		"jquery": "jquery/dist/jquery",
		"jquery.rotate": "../src/app/lib/jquery.rotate/jquery.rotate",
		"jquery.easing": "jquery-easing/jquery.easing",
		"velocity": "velocity/velocity.min",
		"jquery-circle-progress": "jquery-circle-progress/dist/circle-progress",

		"async": "async/lib/async",
		"fly": "../src/app/fly",
		"animationRim": "../src/app/animationRim",
		"music": "../src/app/music",
		"cnknot": "../src/app/cnknot",
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
		'fly': {
			'deps': ['jquery']
		},
		'animationRim': {
			'deps': ['jquery']
		},
		'music': {
			'deps': ['jquery', 'jquery.rotate', 'jquery.easing', 'async', 'fly']
		},
		'cnknot': {
			'deps': ['jquery']
		},
		'app.index': {
			'deps': ['jquery', 'music']
		}
	},
	waitSeconds: 15
});
/*加载文件*/
require([
	'es6-shim', 'jquery', 'jquery.rotate', 'jquery.easing', 'velocity', 'async', 'jquery-circle-progress', 'Vague', 'fly', 'animationRim', 'music', 'cnknot', 'PreloadJS', 'SoundJS',
	'app.index'
], function(require) {
	'use strict';
});