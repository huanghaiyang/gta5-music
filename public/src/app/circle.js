define(['async'], function(async) {
	(function($) {
		'use strict';
		jQuery.fn.circle = function(options) {
			var defaults = {};
			var $opts = $.extend({}, defaults, options);

			function RotateController(id, $o) {
				this.id = id;
				this.interval = null;
				this.$o = $o;
				this.status = RotateController.prototype.status.stopped;
			};
			RotateController.prototype.status = {
				stopped: 0,
				rotating: 1
			};

			RotateController.prototype.rotate = function() {
				this.status = RotateController.prototype.status.rotating;
				var $o = this.$o;
				this.interval = setInterval(function() {
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
				}, (this.interval === null ? 0 : 100));
			};

			RotateController.prototype.stop = function() {
				if (this.interval)
					clearInterval(this.interval);
				this.interval = null;
				this.$o.stop();
				this.status = RotateController.prototype.status.stopped;
			};

			function RotateControllerCollection() {
				this.collection = {};
			};
			RotateControllerCollection.prototype.add = function(rotateController) {
				this.collection[rotateController.id] = rotateController;
			};
			RotateControllerCollection.prototype.get = function(id) {
				return this.collection[id];
			};
			RotateControllerCollection.prototype.remove = function(id) {
				this.collection[id] = null;
				delete this.collection[id];
			};
			RotateControllerCollection.prototype.removeAll = function() {
				this.collection = {};
			};

			function SoundInstance(id, sound) {
				this.id = id;
				this.sound = sound;
				this.status = SoundInstance.prototype.status.paused;
			};
			SoundInstance.prototype.play = function(props) {
				this.sound.play(props);
				this.status = SoundInstance.prototype.status.playing;
			};
			SoundInstance.prototype.resume = function() {
				this.sound._resume();
				this.status = SoundInstance.prototype.status.playing;
			};
			SoundInstance.prototype.pause = function() {
				this.sound._pause();
				this.status = SoundInstance.prototype.status.paused;
			};
			SoundInstance.prototype.status = {
				playing: 0,
				paused: 1
			};

			function SoundCollection() {
				this.collection = {};
			};
			SoundCollection.prototype.add = function(soundInstance) {
				this.collection[soundInstance.id] = soundInstance;
			};
			SoundCollection.prototype.get = function(id) {
				return this.collection[id];
			};
			SoundCollection.prototype.remove = function(id) {
				this.collection[id] = null;
				delete this.collection[id];
			};
			SoundCollection.prototype.removeAll = function() {
				this.collection = {};
			};
			return this.each(function(index, t) {
				var $u = $(this);
				var refreshButton;

				var rotateControllerCollection = new RotateControllerCollection();

				var soundCollection = new SoundCollection();

				//文件预加载队列
				var queue = new createjs.LoadQueue();
				//最大并发数
				queue.setMaxConnections(1);
				//安装声音插件
				queue.installPlugin(createjs.Sound);

				//检测单个文件加载进度
				queue.on("fileprogress", handleFileProgressProxy());

				queue.on("complete", handleComplete);

				function handleComplete(event) {
					var id = queue._loadedScripts[queue._loadedScripts.length - 1].id;
					var $li = $u.find('li[data-id=' + id + ']');
					$li.addClass('active');
					$li.find('canvas').hide();
					var sound = createjs.Sound.play(id);
					var soundInstance = new SoundInstance(id, sound);
					soundCollection.add(soundInstance);
					rotateControllerCollection.get(id).rotate();
					$li.trigger('instance');
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
						console.log(e.item.id + " is loaded " + e.progress);
					};
				};

				function done(data, status) {

					var $ls, len;

					function bindAction($li) {

						var soundInstance, rotateController, id = $li.attr('data-id'),
							$li = $li,
							clickCount = 0,
							firstPlay = true;

						rotateController = new RotateController(id, $li.find('img'));
						rotateControllerCollection.add(rotateController);

						$li.find('canvas').hide();
						$li.bind("click", function() {
							if (clickCount === 0) {
								$ls.filter(function(index) {
									var other = $($ls[index]);
									if (other.attr('data-id') !== id) {
										other.trigger("pause");
									}
								});
								$li.trigger("play");
							} else {
								$li.trigger("pause");
							}
						}).bind("pause", function(evt) {
							if (soundInstance) {
								soundInstance.pause();
								$li.removeClass("active");
								$li.addClass('normal');
								rotateController.stop();
								clickCount = 0;
							}
						}).bind("play", function(evt) {
							if (!firstPlay) {
								soundInstance = soundCollection.get(id);
								if (soundInstance) {
									soundInstance.resume();
									$li.addClass("active");
									$li.removeClass('normal');
									rotateController.rotate();
								}
							} else {
								queue.loadFile({
									id: id,
									src: 'file_server/' + $li.attr('data-path'),
									type: createjs.AbstractLoader.SOUND,
									maintainOrder: true
								}, true);
							}
							firstPlay = false;
							clickCount = 1;
						}).bind('instance', function() {
							soundInstance = soundCollection.get(id);
						});
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

						rotateControllerCollection.removeAll();
						soundCollection.removeAll();


						$ls.filter(function(index) {
							var other = $($ls[index]);
							other.trigger("pause");
							other.unbind('click');
							other.unbind('pause');
							other.unbind('play');
							other.unbind('instance');
						});
						var animateIndex = 0;
						var _width = $ls.eq(0).width();
						var _r = _width / 4;
						var r = $u.width() / 4 - _r;
						async.mapLimit($ls, 1, function(li, callback) {
							setTimeout(function() {
								if (animateIndex < len - 1)
									animateIndex++;
								callback();
							}, 100);
							var $li = $(li);
							var position = getPosition(animateIndex, r);
							$li.animate({
								left: position.x - _r,
								top: position.y - _r,
								width: _width / 2,
								height: _width / 2
							}, {
								easing: 'easeInBack',
								duration: 200,
								complete: function() {
									if (animateIndex === len - 1) {
										load();
										animateIndex = 0;
									}
								}
							});
						}, function(err, results) {
							console.log('the <li>s all animated.');
						});
					};
					//返回列表成功
					if (status === "success") {
						if (data) {
							var arr = [];
							for (var i = 0; i < data.length; i++) {
								var d = data[i];
								var imgPath = 'file_server/' + encodeURIComponent(d.imgPath);
								var $li;
								if (firstLoad) {
									$li = $('<li data-title="' + d.title + '" data-id="sound_' + d.id + '" data-img="' + d.imgPath + '" data-path="' + d.path + '"></li>');
									$li.append($("<div class=\"box\" title=\"" + d.title + "\"><img src='" + imgPath + "'></img></div>"));
									$u.append($li);
								} else {
									$li = $u.find('li').eq(i);
									$li.attr('data-title', d.title);
									$li.attr('data-id', d.id);
									$li.attr('data-img', d.imgPath);
									$li.attr('data-path', d.path);
									$li.removeClass();
									var $box = $li.find('div');
									$box.attr('title', d.title);
									var $img = $box.find('img');
									$img.attr('src', imgPath);
								}
								bindAction($li);
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
							$ls = $u.children("li");
							len = $ls.length;
							var centerPoint = {
								x: $u.width() / 2,
								y: $u.height() / 2
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
							if (firstLoad) {
								refreshButton.bind('click', refreshList);

								$ls.each(function(index, li) {
									$li = $(li);
									var _width = $ls.eq(0).width();
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
										rotateAngle: -Math.PI / 2
									});
								});
							} else {
								var animateIndex = 0;
								var _width = $ls.eq(0).width();
								var _r = _width * 2 / 2;
								var r = $u.width() / 2 - _r;
								async.mapLimit((function() {
									var arr = [];
									for (var i = $ls.length - 1; i >= 0; i--) {
										arr.push($($ls[i]));
									}
									return arr;
								})(), 1, function(li, callback) {
									var $li = $(li);
									setTimeout(function() {
										if (animateIndex < len - 1)
											animateIndex++;
										callback();
									}, 100);
									var position = getPosition(animateIndex, r);
									$li.animate({
										left: position.x - _r,
										top: position.y - _r,
										width: _width * 2,
										height: _width * 2
									}, {
										easing: 'easeInOutBack',
										duration: 200,
										complete: function() {
											$li.find('canvas').show();
											$li.circleProgress({
												value: 0,
												rotateAngle: -Math.PI / 2
											});
											if (animateIndex === len - 1) {
												refreshButton.bind('click', refreshList);
												animateIndex = 0;
											}
										}
									});
								});
							}
						}
					}
					firstLoad = false;
				};

				var firstLoad = true;

				function load() {
					$.ajax({
						url: $opts.url,
						data: {
							number: $opts.number
						},
						dataType: "json",
						type: 'GET'
					}).done(done);
				};
				load();
			});
		};
	})(jQuery);
});