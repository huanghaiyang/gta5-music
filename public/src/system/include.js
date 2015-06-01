/*模块定义*/
require.config({
	baseUrl: "/bower_components/",
	paths: {
		"jquery": "jquery/dist/jquery",

		"domReady": "requirejs-domready/domReady",

		/*angular必要模块*/
		"angular": "angular/angular",
		"angular-resource": "angular-resource/angular-resource",
		"angular-cookies": "angular-cookies/angular-cookies",
		"angular-messages": "angular-messages/angular-messages",
		"angular-couch-potato": "angular-couch-potato/dist/angular-couch-potato",
		"angular-ui-router": "angular-ui-router/release/angular-ui-router",
		"angular-bootstrap": "angular-bootstrap/ui-bootstrap",
		"angular-route": "angular-route/angular-route",

		/*表单验证插件*/
		"ng-fab-form": "ng-fab-form/dist/ng-fab-form",

		/*功能函数*/
		"fun": "../src/system/fun",

		/*应用*/
		"app": "../src/system/app",
		"app.config": "../src/system/config",
		"app.route": "../src/system/route",
		"app.controller": "../src/system/controller",
		/*用户菜单*/
		"usermenu.controller": "../src/system/module/usermenu/controller",
		"usermenu.service": "../src/system/module/usermenu/service",
		/*导航菜单*/
		"usermenu.directives.smartmenu": "../src/system/layout/directives/smartmenu/smartmenu",
		/*导航菜单最小化*/
		"usermenu.directives.minifymenu": "../src/system/layout/directives/minifymenu/minifymenu",
		/*自定义用户菜单*/
		"usermenu.directives.usermenu": "../src/system/layout/directives/usermenu/usermenu"
	},
	shim: {
		"angular": {
			"exports": "AngularJS"
		},
		"angular-resource": {
			"deps": ["angular"]
		},
		"angular-cookies": {
			"deps": ["angular"]
		},
		"angular-messages": {
			"deps": ["angular"]
		},
		"angular-couch-potato": {
			"deps": ["angular"]
		},
		"angular-ui-router": {
			"deps": ["angular"]
		},
		"angular-bootstrap": {
			"deps": ["angular"]
		},
		"angular-route": {
			"deps": ["angular"]
		},
		"ng-fab-form": {
			"deps": ["angular"]
		},
		"app": {
			"deps": ["angular"]
		}
	},
	waitSeconds: 15
});
/*加载文件*/
define([
	"require", "jquery", "angular", "angular-resource", "angular-cookies", "angular-messages", "angular-couch-potato", "angular-ui-router", "angular-bootstrap",
	"angular-route", "ng-fab-form", "fun", "app", "app.route", "app.controller", "app.config", "usermenu.controller", "usermenu.service",
	"usermenu.directives.smartmenu", "usermenu.directives.minifymenu", "usermenu.directives.usermenu"
], function(require) {
	'use strict';
	/*文档可用*/
	require(['domReady'], function(domReady) {
		domReady(function() {
			angular.bootstrap(document.getElementById("app"), ["app"]);
		});

	});
});