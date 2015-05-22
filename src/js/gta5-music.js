(function($) {
	jQuery.fn.gta5Music = function(options) {
		var defaults = {};
		var $opts = $.extend({}, defaults, options);
		return this.each(function(index, t) {
			var $t = $(this);

			if ($opts.centerFill) {
				var $parent = $t.parent();
				var parentWidth = $parent.width();
				var parentHeight = $parent.height();
				if (parentWidth > parentHeight) {
					$t.css({
						width: parentHeight + "px",
						height: parentHeight + "px",
						left: (parentWidth - parentHeight) / 2 + "px"
					});
				} else if (parentWidth < parentHeight) {
					$t.css({
						width: parentWidth + "px",
						height: parentWidth + "px",
						top: (parentHeight - parentWidth) / 2 + "px"
					});
				}
			} else {
				if ($opts.size && $opts.size > 0) {
					$t.css({
						width: $opts.size + "px",
						height: $opts.size + "px"
					});
				}
				if ($opts.top)
					$t.css('top', $opts.top);
				if ($opts.left)
					$t.css('top', $opts.left);
			}

			var _r = $t.children("li").first().width() / 2;
			var r = $t.width() / 2 - _r;
			var centerPoint = {
				x: $t.width() / 2,
				t: $t.height() / 2
			};

			var $lis = $t.find(">li");
			$lis.each(function(index, li) {
				$li = $(li);
				var c = (2 * Math.PI / 360) * (360 / $lis.length) * index;
				var x = centerPoint.x + Math.sin(c) * r;
				var y = centerPoint.x + Math.cos(c) * r;
				$li.css({
					left: x - _r + "px",
					top: y - _r + "px"
				});
				var $audio = $li.children("audio");
				(function($li) {
					$audio[0].addEventListener('canplaythrough', function(e) {
						$li.append($("<div class=\"box\"><div class=\"wrap\"><div class=\"content\">" + decodeURI($audio[0].currentSrc.replace(/.*\//, "").replace(/\.mp3/, "")) + "</div></div></div>"));
					}, false);
				})($li);
			});

		});
	};
})(jQuery);