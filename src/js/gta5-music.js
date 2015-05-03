(function($) {
	jQuery.fn.gta5Music = function(options) {
		var defaults = {};
		var $opts = $.extend({}, defaults, options);
		return this.each(function(index, t) {
			var $t = $(this);

			if ($opts.centerFill) {
				var $parent = $(t).parent();
				var parentWidth = $parent.width();
				var parentHeight = $parent.height();
				if (parentWidth > parentHeight) {
					$(t).css({
						width: parentHeight + "px",
						height: parentHeight + "px",
						left: (parentWidth - parentHeight) / 2 + "px"
					});
				} else if (parentWidth < parentHeight) {
					$(t).css({
						width: parentWidth + "px",
						height: parentWidth + "px",
						top: (parentHeight - parentWidth) / 2 + "px"
					});
				}
			} else {
				if ($opts.size && $opts.size > 0) {
					$(t).css({
						width: $opts.size + "px",
						height: $opts.size + "px"
					});
				}
				if ($opts.top)
					$(t).css('top', $opts.top);
				if ($opts.left)
					$(t).css('top', $opts.left);
			}

			
			var stopCircle = $("<li class='circle stop'></li>");

		});
	};
})(jQuery);