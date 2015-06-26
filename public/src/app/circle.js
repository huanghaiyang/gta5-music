define(['async'], function(async) {
	(function($) {
		jQuery.fn.circle = function(options) {
			var defaults = {};
			var $opts = $.extend({}, defaults, options);
			return this.each(function(index, t) {
				var $u = $(this);
				var refreshButton;
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

				function bindAction($li) {
					var sound, id, $li, clickCount = 0,
						firstPlay = true,
						rotateCtrl, $ls;
					$li = $li;
					id = $li.data('id');
					clickCount = 0;
					firstPlay = true;
					rotateCtrl = new RotateControl($li);
					$ls = $u.find('li');

					$li.addClass('normal');
					$li.data('status', 'loaded');
					$li.find('canvas').hide();

					$li.bind("click", function() {
						if (clickCount === 0) {
							$ls.filter(function(index) {
								var other = $($ls[index]);
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
								sound = createjs.Sound.play(id);
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

				function handleFileProgressProxy() {
					var animationStartValue = 0.0;
					return function(e) {
						var id = e.item.id;
						var $li = $u.find('li[data-id=' + id + ']');
						$li.circleProgress({
							value: e.progress,
							animationStartValue: animationStartValue
						});
						animationStartValue = e.progress;
						if (e.progress === 1) {
							var instance = createjs.Sound.play(id, {
								loop: true
							});
							bindAction($li, $u);
						}
						console.log(e.item.id + " is loaded " + e.progress);
					};
				};

				function doneProxy(firstLoad) {
					return function(data, status) {

						//文件预加载队列
						var queue = new createjs.LoadQueue();
						//最大并发数
						queue.setMaxConnections(1);
						//安装声音插件
						queue.installPlugin(createjs.Sound);
						//检测单个文件加载进度
						queue.on("fileprogress", handleFileProgressProxy());
						//返回列表成功
						if (status === "success") {
							if (data) {
								var arr = [];
								for (var i = 0; i < data.length; i++) {
									var d = data[i];
									var imgPath = 'file_server/' + encodeURIComponent(d.imgPath);
									if (firstLoad) {
										var $li = $('<li data-title="' + d.title + '" data-id="sound_' + d.id + '" data-img="' + d.imgPath + '"></li>');
										$li.append($("<div class=\"box\" title=\"" + d.title + "\"><img src='" + imgPath + "'></img></div>"));
										$u.append($li);
									} else {
										var $li = $($u.find('li')[i]);
										$li.data('title', d.title);
										$li.data('id', d.id);
										$li.data('img', d.imgPath);
										$li.removeClass();
										var $box = $li.find('div');
										$box.attr('title', d.title);
										var $img = $box.find('img');
										$img.attr('src', imgPath);
									}
									//将文件添加到加载队列中
									arr.push({
										id: "sound_" + d.id,
										src: 'file_server/' + d.path,
										type: createjs.AbstractLoader.SOUND,
										maintainOrder: true
									});
								}
								//渲染页面
								if (firstLoad) {
									/*如果填充父容器*/
									if ($opts.centerFill) {
										var $parent = $u.parent();
										var parentWidth = $parent.width();
										var parentHeight = $parent.height();
										if (parentWidth > parentHeight) {
											$u.css({
												width: parentHeight,
												height: parentHeight,
												left: (parentWidth - parentHeight) / 2
											});
										} else if (parentWidth <= parentHeight) {
											$u.css({
												width: parentWidth,
												height: parentWidth,
												top: (parentHeight - parentWidth) / 2
											});
										}
									} else {
										if ($opts.size && $opts.size > 0) {
											$u.css({
												width: $opts.size,
												height: $opts.size
											});
										}
										if ($opts.top)
											$u.css('top', $opts.top);
										if ($opts.left)
											$u.css('top', $opts.left);
									}
								}
								var $ls = $u.children("li");
								var len = $ls.length;
								var centerPoint = {
									x: $u.width() / 2,
									y: $u.height() / 2
								};

								function getPosition(index, r) {
									var c = (2 * Math.PI / 360) * (360 / len) * (len - index) + Math.PI;
									var x = centerPoint.x + Math.sin(c) * r;
									var y = centerPoint.y + Math.cos(c) * r;
									return {
										c: c,
										x: x,
										y: y
									};
								};

								function refreshList() {
									refreshButton.unbind('click', refreshList);
									queue.close();
									queue.removeAll();
									queue = null;
									$ls.filter(function(index) {
										var other = $($ls[index]);
										if (other.data('status') === 'loaded')
											other.trigger("pause");
									});
									var animateIndex = 0;
									async.mapLimit($ls, 1, function(li, callback) {
										setTimeout(function() {
											if (animateIndex < len - 1)
												animateIndex++;
											callback();
										}, 100);
										var $li = $(li);
										var _width = $ls.eq(0).width();
										var _r = _width / 4;
										var r = $u.width() / 4 - _r;
										var position = getPosition(animateIndex, r);
										$li.animate({
											left: position.x - _r,
											top: position.y - _r,
											width: _width / 2,
											height: _width / 2
										}, {
											easing: 'easeInBack',
											duration: 300,
											complete: function() {
												if (animateIndex === len - 1) {
													load(false);
													animateIndex = 0;
												}
											}
										});
									}, function(err, results) {
										console.log('the <li>s all animated.');
									});
								};
								if (!refreshButton) {
									refreshButton = $("<span title=\"刷新音乐列表\" class=\"refresh-btn\"><i class=\"glyphicon glyphicon-refresh\"></i></span>")
									/*刷线按钮插入文档中*/
									refreshButton.insertAfter($u);
									refreshButton.css({
										left: centerPoint.x - refreshButton.width() / 2 + $u.position().left,
										top: centerPoint.y - refreshButton.height() / 2 + $u.position().top
									});
								}
								if (firstLoad)
									refreshButton.bind('click', refreshList);

								$ls.each(function(index, li) {
									$li = $(li);
									var _width = $ls.eq(0).width();
									if (firstLoad) {
										var _r = _width / 2;
										var r = $u.width() / 2 - _r;
										var position = getPosition(index, r);
										$li.css({
											left: position.x - _r,
											top: position.y - _r
										});
										$li.circleProgress({
											value: 0,
											size: 100,
											fill: {
												gradient: ['#0099CC']
											},
											startAngle: -Math.PI / 2
										});
									} else {
										var _r = _width * 2 / 2;
										var r = $u.width() / 2 - _r;
										var position = getPosition(index, r);
										$li.animate({
											left: position.x - _r,
											top: position.y - _r,
											width: _width * 2,
											height: _width * 2
										}, {
											easing: 'easeInBack',
											duration: 300,
											complete: function() {
												$li.find('canvas').show();
												$li.circleProgress({
													value: 0,
													startAngle: -Math.PI / 2
												});
												if (index === len - 1)
													refreshButton.bind('click', refreshList);
											}
										});
									}
								});
								//开始加载
								queue.loadManifest(arr, false);
								queue.load();
							}
						}
					};
				};

				function load(firstLoad) {
					$.ajax({
						url: $opts.url,
						data: {
							number: $opts.number
						},
						dataType: "json",
						type: 'GET'
					}).done(doneProxy(firstLoad));
				};
				load(true);
			});
		};
	})(jQuery);
});