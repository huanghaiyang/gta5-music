/*模块定义*/
require.config({
	baseUrl: "/bower_components/",
	paths: {
		"es6-shim": 'es6-shim/es6-shim.min',
		"jquery": "jquery/dist/jquery",
		"jquery.easing": "jquery-easing/jquery.easing",
		"velocity": "velocity/velocity.min",
		"jquery-ui": "jquery-ui/jquery-ui.min",

		"underscore": "underscore/underscore",

		"async": "async/lib/async",
		"app.search": "../src/app/search",
		'app.nav': '../src/app/nav',
		"inputSearch": '../src/app/inputSearch',
		'utils': '../src/app/utils'
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
		'inputSearch': {
			'deps': ['jquery', 'utils']
		},
		'app.search': {
			'deps': ['jquery', 'jquery.easing', 'async', 'underscore', 'utils']
		},
		'app.nav': {
			'deps': ['jquery', 'inputSearch']
		}
	},
	waitSeconds: 15
});
/*加载文件*/
require([
	'es6-shim', 'jquery', 'jquery.easing', 'jquery-ui', 'underscore', 'velocity', 'async', 'inputSearch', 'utils', 'app.search', 'app.nav'
], function(require) {
	'use strict';
});