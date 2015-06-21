(function($) {
	jQuery.fn.circle = function(options) {
		var defaults = {};
		var $opts = $.extend({}, defaults, options);

		/*旋转*/
		function RotateControl($o) {
			var rotate = null;

			/*旋转*/
			function start() {
				rotate = setInterval(function() {
					if (!$o.is(":animated")) {
						var rotated = $o.css('rotate');
						$o.animate({
							rotate: "360deg"
						}, (function() {
							if (rotated === 0 || rotated === "")
								return 5000;
							else {
								return 5000 * (360 - parseInt(rotated)) / 360;
							}
						})(), 'linear');
					}
				}, 0);
			};

			/*停止旋转*/
			function stop() {
				clearInterval(rotate);
				$o.stop();
			};
			return {
				start: start,
				stop: stop
			};
		};

		/*刷新按钮*/
		var RefreshButton = $("<span class=\"glyphicon glyphicon-refresh refresh-btn\" aria-hidden=\"true\" title=\"刷新音乐列表\"></span>");
		/*点击刷新触发请求*/
		RefreshButton.bind("click", function(evt) {
			// loadList();
		});
		return this.each(function(index, t) {
			var $t = $(this);
			var refreshButton = RefreshButton.clone(true);
			/*刷线按钮插入文档中*/
			refreshButton.insertAfter($t);
			/*如果填充父容器*/
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
				left: centerPoint.x - refreshButton.width() / 2 + $t.position().left,
				top: centerPoint.y - refreshButton.height() / 2 + $t.position().top
			});

			var $lis = $t.find(">li");
			$lis.each(function(index, li) {
				$li = $(li);
				var c = (2 * Math.PI / 360) * (360 / $lis.length) * ($lis.length - index) + Math.PI;
				console.log(c);
				var x = centerPoint.x + Math.sin(c) * r;
				var y = centerPoint.y + Math.cos(c) * r;
				$li.css({
					left: x - _r,
					top: y - _r
				});
				(function($li, index) {
					$li.append($("<div class=\"box\" title=\"" + $li.data('title') + "\"><img src='file_server/" + encodeURIComponent($li.data('img')) + "'></img></div>"));
					$li.circleProgress({
						value: 0,
						size: 120,
						fill: {
							gradient: ['#0099CC']
						}
					});
					var sound = createjs.Sound.play("sound_" + $li.data('id'), {
						interrupt: createjs.Sound.INTERRUPT_ANY,
						loop: 1
					});
					sound.stop();
					var clickCount = 0;
					var firstPlay = true;
					var rotateCtrl = new RotateControl($li);
					$li.on("click", function() {
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
						sound._pause();
						rotateCtrl.stop();
						clickCount = 0;
					}).bind("play", function(evt) {
						$li.addClass("active");
						$li.find(".box").addClass("active");
						if (firstPlay === true) {
							sound.play();
							firstPlay = false;
						} else {
							sound._resume();
						}
						rotateCtrl.start();
						clickCount = 1;
					});
				})($li, index);
			});

		});
	};
})(jQuery);