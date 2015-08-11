(function($) {
	$.fn.inputSearch = function(options) {
		var defaults = {
			autoWrite: false,
			url: '',
			key: 'keywords'
		};
		var $opts = $.extend({}, defaults, options);
		return this.each(function() {
			var $self = $(this),
				params = utils.url.params();
			if ($opts.autoWrite) {
				if (params[$opts.key])
					$self.val(params[$opts.key]);
			}
			$self.on('keyup', function(ev) {
				if (ev.keyCode === 13) {
					window.location = $opts.url + '&keywords=' + $self.val()
				}
			}).on('keydown', function(ev) {
				if (ev.keyCode === 13) {
					ev.preventDefault();
				}
			});
		});
	};
})(jQuery);