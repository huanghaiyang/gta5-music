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
		"jquery-ui": "jquery-ui/jquery-ui.min",

		"async": "async/lib/async",
		"fly": "../src/app/fly",
		"animationRim": "../src/app/animationRim",
		"music": "../src/app/music",
		"cnknot": "../src/app/cnknot",
		"app.index": "../src/app/index",
		'app.nav': '../src/app/nav',

		'PreloadJS': 'PreloadJS/lib/preloadjs-0.6.1.combined',
		'SoundJS': 'SoundJS/lib/soundjs-0.6.1.combined',

		'Vague': 'Vague.js/Vague',
		'inputSearch': '../src/app/inputSearch',
		'utils': '../src/app/utils'
	},
	shim: {
		'jquery.rotate': {
			'deps': ['jquery']
		},
		'jquery.easing': {
			'deps': ['jquery']
		},
		'jquery-ui': {
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
		'inputSearch': {
			'deps': ['jquery']
		},
		'app.index': {
			'deps': ['jquery', 'music']
		},
		'app.nav': {
			'deps': ['jquery', 'inputSearch', 'utils']
		}
	},
	waitSeconds: 15
});
/*加载文件*/
require([
	'es6-shim', 'jquery', 'jquery.rotate', 'jquery.easing', 'jquery-ui', 'velocity',
	'async', 'jquery-circle-progress', 'Vague', 'fly', 'animationRim', 'music', 'cnknot', 'PreloadJS', 'SoundJS', 'inputSearch', 'utils',
	'app.index', 'app.nav'
], function (require) {
	'use strict';
});