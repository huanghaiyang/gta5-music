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

		/*用户导航菜单*/
		"usermenu": "../src/system/app/usermenu/usermenu",
		"usermenu.route": "../src/system/app/usermenu/route",
		"usermenu.controller": "../src/system/app/usermenu/controller",
		"usermenu.config": "../src/system/app/usermenu/config",
		"usermenu.service": "../src/system/app/usermenu/service",
		"usermenu.directives.smartmenu": "../src/system/layout/directives/smartmenu/smartmenu",
		"usermenu.directives.usermenu" : "../src/system/layout/directives/usermenu/usermenu"
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
		"usermenu": {
			"deps": ["angular"]
		}
	},
	waitSeconds: 15
});
/*加载文件*/
define([
	"require", "jquery", "angular", "angular-resource", "angular-cookies", "angular-messages", "angular-couch-potato", "angular-ui-router", "angular-bootstrap",
	"angular-route", "ng-fab-form", "fun", "usermenu", "usermenu.route", "usermenu.controller", "usermenu.config", "usermenu.service",
	 "usermenu.directives.smartmenu" , "usermenu.directives.usermenu"
], function(require) {
	'use strict';
	/*文档可用*/
	require(['domReady'], function(domReady) {
		domReady(function() {
			angular.bootstrap(document.getElementById("usermenu"), ["usermenu"]);
		});

	});
});