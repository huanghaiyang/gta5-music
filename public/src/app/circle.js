(function($) {
	jQuery.fn.circle = function(options) {
		var defaults = {};
		var $opts = $.extend({}, defaults, options);

		function RotateControl($o) {
			var rotate = null;

			function start() {
				rotate = setInterval(function() {
					if (!$o.is(":animated")) {
						$o.animate({
							rotate: "360deg"
						}, 10000, 'linear');
					}
				}, 0);
			};

			function stop() {
				clearInterval(rotate);
				$o.stop();
			};
			return {
				start: start,
				stop: stop
			};
		};

		var xhr = new XMLHttpRequest();

		function load(url) {
			xhr.open("GET", url);
			xhr.responseType = "arraybuffer";
			xhr.load(function() {

			});
		};

		function loadList() {
			$.ajax({
				url: '/music/random',
				dataType: "json",
				timeout: 60000,
				type: 'GET',
				success: function(data, textStatus, jqXHR) {
					if (data) {
						for (var i in data) {
							load(data[i].url);
						}
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {

				}
			});
		};

		var RefreshButton = $("<div class=\"refresh-button\"><a>换一组</a></div>");
		RefreshButton.bind("click", function(evt) {
			loadList();
		});
		return this.each(function(index, t) {
			var $t = $(this);
			var refreshButton = RefreshButton.clone(true);
			refreshButton.insertAfter($t);
			if ($opts.centerFill) {
				var $parent = $t.parent();
				var parentWidth = $parent.width();
				var parentHeight = $parent.height();
				if (parentWidth > parentHeight) {
					$t.css({
						width: parentHeight,
						height: parentHeight,
						left: (parentWidth - parentHeight) / 2
					});
				} else if (parentWidth <= parentHeight) {
					$t.css({
						width: parentWidth,
						height: parentWidth,
						top: (parentHeight - parentWidth) / 2
					});
				}
			} else {
				if ($opts.size && $opts.size > 0) {
					$t.css({
						width: $opts.size,
						height: $opts.size
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
				y: $t.height() / 2
			};

			refreshButton.css({
				left: centerPoint.x - refreshButton.width() / 2,
				top: centerPoint.y - refreshButton.height() / 2
			});

			var $lis = $t.find(">li");
			$lis.each(function(index, li) {
				$li = $(li);
				var c = (2 * Math.PI / 360) * (360 / $lis.length) * index;
				var x = centerPoint.x + Math.sin(c) * r;
				var y = centerPoint.y + Math.cos(c) * r;
				$li.css({
					left: x - _r,
					top: y - _r
				});
				(function($li, index) {
					$li.append($("<div class=\"box\"><div class=\"wrap\"><div class=\"content\">" + $li.data('title') + "</div></div></div>"));
					var sound = createjs.Sound.play("sound_" + $li.data('id'), {
						interrupt: createjs.Sound.INTERRUPT_ANY,
						loop: 1
					});
					sound.stop();
					var clickCount = 0;
					var rotateCtrl = new RotateControl($li);
					$li.bind("click", function() {
						if (clickCount === 0) {
							$lis.filter(function(index_) {
								if (index_ !== index) {
									$($lis[index_]).trigger("pause");
								}
							});
							$li.trigger("play");
						} else {
							$li.trigger("pause");
						}
					}).bind("pause", function(evt) {
						$li.removeClass("active");
						$li.find(".box").removeClass("active");
						sound.stop();
						rotateCtrl.stop();
						clickCount = 0;
					}).bind("play", function(evt) {
						$li.addClass("active");
						$li.find(".box").addClass("active");
						sound.play();
						rotateCtrl.start();
						clickCount = 1;
					});
				})($li, index);
			});

		});
	};
})(jQuery);