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

		/*信息提示插件*/
		"smart.notification": "../src/system/smartadmin/js/notification/SmartNotification.min",
		/*组件*/
		"smart.widgets": "../src/system/smartadmin/js/smartwidgets/jarvis.widget.min",

		/*表单验证插件*/
		"ng-fab-form": "ng-fab-form/dist/ng-fab-form",

		/*功能函数*/
		"fun": "../src/system/fun",

		/*应用*/
		"app": "../src/system/app",
		"app.config": "../src/system/config",
		"app.route": "../src/system/route",
		"app.controller": "../src/system/controller",

		/*导航菜单*/
		"app.directives.smartmenu": "../src/system/layout/directives/smartmenu/smartmenu",
		/*导航菜单最小化*/
		"app.directives.minifymenu": "../src/system/layout/directives/minifymenu/minifymenu",
		/*自定义用户菜单*/
		"app.directives.usermenu": "../src/system/layout/directives/usermenu/usermenu",
		/*页面模板*/
		"app.directives.fakepage": "../src/system/layout/directives/fakepage/fakepage",
		/*分页指令*/
		"app.directives.paginator": "../src/system/layout/directives/paginator/paginator",
		/*导航条*/
		"app.directives.ribbon": "../src/system/layout/directives/ribbon/ribbon",

		/*分页插件*/
		"app.plugin.paginator": "../src/system/plugin/paginator/paginator",

		/*首页*/
		"home.controller": "../src/system/module/home/controller",

		/*用户菜单*/
		"usermenu.controller": "../src/system/module/usermenu/controller",
		"usermenu.service": "../src/system/module/usermenu/service",

		/*音乐管理*/
		"music.controller": "../src/system/module/music/controller",
		"music.service": "../src/system/module/music/service",

		/*mp3媒体播放插件*/
		"audio.audiojs": "../src/system/plugin/audiojs/audio",
		"audio.directives.audioJ": "../src/system/layout/directives/audiojs/audio"
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
		"smart.notification": {
			"deps": ["jquery"]
		},
		"smart.widgets": {
			"deps": ["jquery"]
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
require([
	"require", "jquery", "angular", "angular-resource", "angular-cookies", "angular-messages", "angular-couch-potato", "angular-ui-router", "angular-bootstrap", "angular-route",
	"smart.notification", "smart.widgets",
	"ng-fab-form", "fun",
	"app", "app.route", "app.controller", "app.config",
	"app.directives.smartmenu", "app.directives.minifymenu", "app.directives.usermenu", "app.directives.fakepage", "app.directives.paginator",
	"app.plugin.paginator", "app.directives.ribbon",
	"home.controller",
	"usermenu.controller", "usermenu.service",
	"music.controller", "music.service",
	"audio.audiojs", "audio.directives.audioJ"
], function(require) {
	'use strict';
	/*文档可用*/
	require(['domReady'], function(domReady) {
		domReady(function() {
			angular.bootstrap(document.getElementById("app"), ["app"]);
		});

	});
});