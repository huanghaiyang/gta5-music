define(["usermenu", "fun"], function(app, Fun) {
	app.config(function($httpProvider) {

		$httpProvider.interceptors.push(function($q) {
			return {
				request: function(config) {
					config.headers['x-request-with'] = 'xmlhttprequest';
					return config || $q.when(config);
				},
				responseError: function(res) {
					if (res.status === 401) {
						location.reload();
					} else if (res.status === 500) {
						Fun.msg.notifyWarn(res.status + ' ' + res.statusText, res.data.message)
					}
					return $q.reject(res);
				}
			};
		});
	});
});