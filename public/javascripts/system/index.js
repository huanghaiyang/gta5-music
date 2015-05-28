/*模块定义*/
require.config({
	baseUrl: "/bower_components/",
	paths: {
		"jquery": "jquery/dist/jquery.min",

		"domReady": "requirejs-domready/domReady",

		"angular": "angular/angular",
		"angular-resource": "angular-resource/angular-resource.min",
		"angular-cookies": "angular-cookies/angular-cookies.min",
		"angular-couch-potato": "angular-couch-potato/dist/angular-couch-potato",
		"angular-ui-router": "angular-ui-router/release/angular-ui-router.min",
		"angular-bootstrap": "angular-bootstrap/ui-bootstrap.min",

		"layout/module": "../lib/smartadmin/layout/module",
		"layout/smartadmin/directives/smartmenu": "../lib/smartadmin/layout/directives/smartmenu",

		"app": "../javascripts/system/app"
	},
	shim: {
	},
	waitSeconds: 15
});
/*加载文件*/
define([
	'require', "jquery", "angular", "angular-resource", "angular-cookies", "angular-couch-potato", "angular-ui-router", "angular-bootstrap"], function(require) {
	'use strict';
	/*文档可用*/
	require(['domReady',"app","layout/smartadmin/directives/smartmenu"], function(domReady) {
		domReady(function() {

		});

	});
});