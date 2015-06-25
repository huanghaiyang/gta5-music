(function($) {
	jQuery.fn.circle = function(options) {
		var defaults = {};
		var $opts = $.extend({}, defaults, options);

		//旋转

		function RotateControl($o) {
			var rotate = null;

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
				}, (rotate === null ? 0 : 100));
			};

			//停止旋转

			function stop() {
				if (rotate)
					clearInterval(rotate);
				rotate = null;
				$o.stop();
			};
			return {
				start: start,
				stop: stop
			};
		};

		function bindAction($li, $ul) {
			var sound, id, $li, clickCount = 0,
				firstPlay = true,
				rotateCtrl, $lis;
			$li = $li;
			id = $li.data('id');
			clickCount = 0;
			firstPlay = true;
			rotateCtrl = new RotateControl($li);
			$lis = $ul.find('li');

			$li.addClass('normal');
			$li.data('status', 'loaded');
			$li.find('canvas').remove();

			$li.bind("click", function() {
				if (clickCount === 0) {
					$lis.filter(function(index) {
						var other = $($lis[index]);
						if (other.data('id') !== id) {
							if (other.data('status') === 'loaded')
								other.trigger("pause");
						}
					});
					$li.trigger("play");
				} else {
					$li.trigger("pause");
				}
			}).bind("pause", function(evt) {
				$li.removeClass("active");
				$li.find(".box").removeClass("active");
				if (sound)
					sound._pause();
				rotateCtrl.stop();
				clickCount = 0;
			}).bind("play", function(evt) {
				if ($li.data('status') === 'loaded') {
					$li.addClass("active");
					$li.find(".box").addClass("active");
					if (firstPlay === true) {
						sound = createjs.Sound.play(id, {
							loop: true
						});
						firstPlay = false;
					} else {
						if (sound)
							sound._resume();
					}
					rotateCtrl.start();
					clickCount = 1;
				}
			});
		};

		function handleFileProgressProxy($ul) {
			var animationStartValue = 0.0;
			return function(e) {
				var id = e.item.id;
				var $li = $ul.find('li[data-id=' + id + ']');
				$li.circleProgress({
					value: e.progress,
					animationStartValue: animationStartValue
				});
				animationStartValue = e.progress;
				if (e.progress === 1) {
					bindAction($li, $ul);
				}
				console.log(e.item.id + " is loaded " + e.progress);
			};
		};

		function doneProxy($ul) {
			return function(data, status) {

				//文件预加载队列
				var queue = new createjs.LoadQueue();
				//最大并发数
				queue.setMaxConnections(1);
				//安装声音插件
				queue.installPlugin(createjs.Sound);
				//检测单个文件加载进度
				queue.on("fileprogress", handleFileProgressProxy($ul));

				//返回列表成功
				if (status === "success") {
					if (data) {
						var arr = [];
						for (var i = 0; i < data.length; i++) {
							var d = data[i];
							$ul.append($('<li data-title="' + d.title + '" data-id="sound_' + d.id + '" data-img="' + d.imgPath + '"></li>'));

							//将文件添加到加载队列中
							arr.push({
								id: "sound_" + d.id,
								src: 'file_server/' + d.path,
								type: createjs.AbstractLoader.SOUND,
								maintainOrder: true
							});
						}
						//渲染页面
						render($ul);
						//开始加载
						queue.loadManifest(arr);
					}
				}
			};
		};

		function render($ul) {
			/*如果填充父容器*/
			if ($opts.centerFill) {
				var $parent = $ul.parent();
				var parentWidth = $parent.width();
				var parentHeight = $parent.height();
				if (parentWidth > parentHeight) {
					$ul.css({
						width: parentHeight,
						height: parentHeight,
						left: (parentWidth - parentHeight) / 2
					});
				} else if (parentWidth <= parentHeight) {
					$ul.css({
						width: parentWidth,
						height: parentWidth,
						top: (parentHeight - parentWidth) / 2
					});
				}
			} else {
				if ($opts.size && $opts.size > 0) {
					$ul.css({
						width: $opts.size,
						height: $opts.size
					});
				}
				if ($opts.top)
					$ul.css('top', $opts.top);
				if ($opts.left)
					$ul.css('top', $opts.left);
			}
			var $lis = $ul.children("li");
			var _r = $lis.first().width() / 2;
			var r = $ul.width() / 2 - _r;
			var centerPoint = {
				x: $ul.width() / 2,
				y: $ul.height() / 2
			};

			var refreshButton = $("<span title=\"刷新音乐列表\" class=\"refresh-btn\"><i class=\"glyphicon glyphicon-refresh\"></i></span>")
			refreshButton.bind('click', function(e) {
				$lis.filter(function(index) {
					var other = $($lis[index]);
					if (other.data('status') === 'loaded')
						other.trigger("pause");
				});
			});
			/*刷线按钮插入文档中*/
			refreshButton.insertAfter($ul);
			refreshButton.css({
				left: centerPoint.x - refreshButton.width() / 2 + $ul.position().left,
				top: centerPoint.y - refreshButton.height() / 2 + $ul.position().top
			});

			var $lis = $ul.find(">li");
			$lis.each(function(index, li) {
				$li = $(li);
				var c = (2 * Math.PI / 360) * (360 / $lis.length) * ($lis.length - index) + Math.PI;
				var x = centerPoint.x + Math.sin(c) * r;
				var y = centerPoint.y + Math.cos(c) * r;
				$li.css({
					left: x - _r,
					top: y - _r
				});
				$li.append($("<div class=\"box\" title=\"" + $li.data('title') + "\"><img src='file_server/" + encodeURIComponent($li.data('img')) + "'></img></div>"));
				$li.circleProgress({
					value: 0,
					size: 100,
					fill: {
						gradient: ['#0099CC']
					},
					startAngle: -Math.PI / 2
				});
			});
		};

		return this.each(function(index, t) {
			var $ul = $(this);
			$.ajax({
				url: $opts.url,
				data: {
					number: $opts.number
				},
				dataType: "json",
				type: 'GET'
			}).done(doneProxy($ul));
		});
	};
})(jQuery);