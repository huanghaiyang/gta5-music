/*模块定义*/
require.config({
	baseUrl: "/bower_components/",
	paths: {
		"jquery": "jquery/dist/jquery",
		"jquery.rotate": "../src/app/lib/jquery.rotate/jquery.rotate",

		"circle": "../src/app/circle"
	},
	shim: {
		'jquery.rotate': {
			'deps': ['jquery']
		},
		'circle': {
			'deps': ['jquery', 'jquery.rotate']
		}
	},
	waitSeconds: 15
});
/*加载文件*/
define([
	'jquery', 'jquery.rotate', 'circle'
], function(require) {
	'use strict';
	/*文档可用*/
	$(function() {
		$('#me').circle({
			centerFill: true
		});
	});
});