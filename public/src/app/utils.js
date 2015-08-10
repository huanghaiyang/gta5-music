var utils = (function() {
	return {
		url: {
			params: function() {
				var params = {};
				window.location.search.replace(/^\?/, '').split('&').filter(function(key) {
					if (key)
						return true;
					else
						return false;
				}).forEach(function(value, index) {
					var arr = value.split(/=/);
					params[arr[0]] = decodeURIComponent(arr[1]);
				});
				return params;
			}
		}
	};
})();