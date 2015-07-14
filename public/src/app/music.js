define(['async'], function(async) {
	(function($) {
		'use strict';
		window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
		var audioContext = new window.AudioContext();

		window.memory = window.localStorage || (window.UserDataStorage && new UserDataStorage()) || new cookieStorage();

		function throttle(fn, delay) {
			var timer = null;
			return function() {
				var context = this,
					args = arguments;
				clearTimeout(timer);
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			};
		};

		var vagueToggle = (function() {
			var vague, fnCollection = {};

			function init(v, fn) {
				vague = v;
				if (fn)
					fn();
			};

			function exist() {
				return !!vague;
			};

			function regist(name, fn) {
				fnCollection[name] = fn;
			};

			function trigger(name, isRemove) {
				vague.animate(10, {
					duration: 500,
					easing: 'linear'
				}).done(function() {
					if (fnCollection[name])
						fnCollection[name]();
					vague.animate(30, {
						duration: 500,
						easing: 'linear'
					}).done(function() {
						if (isRemove) {
							fnCollection[name] = null;
							delete fnCollection[name];
						}
					});
				});
			};
			return {
				init: init,
				exist: exist,
				regist: regist,
				trigger: trigger
			};
		})();

		function convertTime(time) {
			var m = Math.floor(Math.floor(time) / 60),
				s = parseInt(Math.floor(time) % 60);
			if ((m + '').length === 1)
				m = '0' + m;
			if ((s + '').length === 1)
				s = '0' + s;
			return m + ':' + s;
		};

		function clearAudioTags() {
			$('audio').remove();
		};

		var config = {
			file_server: 'file_server/',
			sound: 'sound_'
		};

		var cssConfig = {
			pause: 'glyphicon-pause',
			play: 'glyphicon-play',
			volumeOff: 'glyphicon-volume-off',
			volumeUp: 'glyphicon-volume-up'
		};

		function RotateController(id, $o) {
			this.id = id;
			this.$o = $o;
			this.timeout = null;
		};

		RotateController.prototype = (function() {
			return {
				rotate360: function() {
					var t = this;
					var $o = t.$o;
					this.timeout = setTimeout(function() {
						if (!$o.is(":animated")) {
							t.rotate(360, 5000);
						}
					}, (this.timeout === null ? 0 : 300));
				},
				stop: function() {
					this.clearTimeout();
					this.$o.stop();
				},
				clearTimeout: function() {
					if (this.timeout)
						clearTimeout(this.timeout);
					this.timeout = null;
				},
				rotate: function(deg, duration, callback) {
					var t = this;
					var rotated = this.$o.css('rotate');
					if (deg === 0 && rotated == "") {
						if (callback)
							callback();
						return;
					}
					this.clearTimeout();
					this.$o.stop(true, false).animate({
						rotate: deg + 'deg'
					}, {
						easing: 'linear',
						duration: (function() {

							if (rotated === 0 || rotated === "")
								return duration;
							else {
								return duration * (360 - parseInt(rotated)) / 360;
							}
						})(),
						complete: function() {
							if (deg !== 0)
								t.rotate360();
							if (callback)
								callback();
						}
					});
				},
				reset0: function(callback) {
					this.rotate(0, 100, callback);
				}
			};
		})();

		function RotateControllerCollection() {
			this.collection = {};
		};
		RotateControllerCollection.prototype = (function() {
			return {
				add: function(rotateController) {
					this.collection[rotateController.id] = rotateController;
				},
				get: function(id) {
					return this.collection[id];
				},
				remove: function(id) {
					this.collection[id] = null;
					delete this.collection[id];
				},
				removeAll: function() {
					this.collection = {};
				},
				resetAll: function(callback) {
					async.eachOf(this.collection, function(rot, id, cb) {
						rot.reset0(cb);
					}, function() {
						if (callback)
							callback();
					});
				}
			};
		})();

		function SoundInstance(id, sound, tag) {
			this.id = id;
			this.sound = sound;
			this.tag = tag;
		};
		SoundInstance.prototype = (
			function() {
				return {
					play: function(props) {
						if (this.hasPlaybackResource()) {
							props.volume = VolumeStorage.get();
							this.sound.play(props);
						} else if (this.tag) {
							this.tag.play();
							this.setVolume();
						}
					},
					resume: function() {
						if (this.hasPlaybackResource())
							this.sound._resume();
						else if (this.tag)
							this.tag.resume();
						this.setVolume();
					},
					pause: function() {
						if (this.hasPlaybackResource())
							this.sound._pause();
						else if (this.tag)
							this.tag.pause();
					},
					hasPlaybackResource: function() {
						return this.sound && this.sound._playbackResource;
					},
					setVolume: function(value) {
						this.tag.volume = value !== undefined ? value : VolumeStorage.get();
					}
				};
			})();

		function SoundCollection() {
			this.indexes = {};
			this.collection = [];
		};
		SoundCollection.prototype = (function() {
			return {
				add: function(soundInstance) {
					this.collection[this.collection.length] = soundInstance;
					this.indexes[soundInstance.id] = this.collection.length - 1;
				},
				get: function(id) {
					return this.getByIndex(this.indexes[id]);
				},
				remove: function(id) {
					var index = this.indexes[id];
					this.indexes[id] = null;
					delete this.indexes[id];
					this.collection.slice(index, 1);
				},
				getByIndex: function(index) {
					return this.collection[index];
				},
				getNext: function(id) {
					if (this.indexes[id] + 1 === this.collection.length)
						return this.getByIndex(0);
					else
						return this.getByIndex(this.indexes[id] + 1);
				},
				getPre: function(id) {
					if (this.indexes[id] - 1 < 0)
						return this.getByIndex(this.collection.length - 1)
					else
						return this.getByIndex(this.indexes[id] - 1);
				},
				getFirst: function() {
					return this.getByIndex(0);
				},
				getLast: function() {
					return this.getByIndex(this.collection.length - 1);
				},
				removeAll: function() {
					this.collection = [];
					this.indexes = {};
				},
				getFirstId: function() {
					return this.collection[0].id;
				},
				getLastId: function() {
					return this.collection[this.collection.length - 1].id;
				},
				getPreId: function(id) {
					return this.getPre(id).id;
				},
				getNextId: function(id) {
					return this.getNext(id).id
				}
			};
		})();

		function ProgressBar(remainProgress, nowProgress) {
			this.remainProgress = remainProgress;
			this.nowProgress = nowProgress
		};
		ProgressBar.prototype = (function() {
			return {
				clearRemainProgress: function() {
					this.setRemainProgress(0);
				},
				clearNowProgress: function() {
					this.setNowProgress(0);
				},
				clearAll: function() {
					this.clearNowProgress();
					this.clearRemainProgress();
				},
				setNowProgress: function(value) {
					this.nowProgress.css({
						width: value + "%"
					});
					this.nowProgress.attr('aria-valuenow', value);
				},
				setRemainProgress: function(value) {
					this.remainProgress.css({
						width: value + "%"
					});
					this.remainProgress.attr('aria-valuenow', value);
				},
				setProgress: function(value) {
					this.setNowProgress(value);
					this.setRemainProgress(100 - value);
				}
			};
		})();

		function HoverDelay() {
			this.interval = null;
			this.count = 0;
			this.total = 10;
			this.step = 1;
			this.time = 10;
		};
		HoverDelay.prototype = (function() {
			return {
				config: function(config) {
					this.total = config.total;
					this.step = config.step;
					this.time = config.time;
				},
				over: function(fn) {
					var t = this;
					this.interval = setInterval(function() {
						t.count += t.step;
						if (t.count >= t.total) {
							fn();
							t.clear();
						}
					}, this.time);
				},
				clear: function() {
					clearInterval(this.interval);
					this.interval = null;
					this.count = 0;
				}
			};
		})();

		function CnKnot(id, $element) {
			this.$element = $element;
			this.id = id;
		};

		CnKnot.prototype = (function() {
			return {
				show: function() {
					/*
					很奇怪：这么写竟然没有渐变效果
					this.$element.show();
					this.$element.css({
						opacity: 0.9
					});
					*/
					var self = this;
					this.$element.show();
					this.$element.css({
						opacity: 0
					});
					this.$element.animate({
						opacity: 0.9
					}, {
						duration: 300,
						complete: function() {}
					});
				},
				hide: function() {
					var self = this;
					this.$element.css({
						opacity: 0
					});
					setTimeout(function() {
						self.$element.hide();
					}, 300);
				},
				css: function(style) {
					this.$element.css(style);
				},
				reset: function() {
					var $li = $('body').find('li[data-id=' + this.id + ']');
					this.$element.css({
						top: $li.offset().top + $li.height() - this.$element.height() / 4,
						left: $li.offset().left - this.$element.width() / 2 + $li.width() / 2
					});
				}
			};
		})();

		var CnknotCollection = (function() {
			var collections = {};
			return {
				add: function(cnknot) {
					collections[cnknot.id] = cnknot;
				},
				get: function(id) {
					return collections[id];
				},
				hideAll: function() {
					for (var i in collections) {
						collections[i].hide();
					}
				},
				exist: function(id) {
					return !!collections[id]
				},
				resetAll: function() {
					for (var i in collections) {
						collections[i].reset();
					}
				},
				listeners: {
					resize: function() {
						console.log('resize window');
						CnknotCollection.resetAll();
					}
				}
			};
		})();
		window.addEventListener('resize', throttle(CnknotCollection.listeners.resize, 20), false);

		var VolumeStorage = (function() {
			var volumeStage = memory.getItem('volumeStage') || 1;
			return {
				set: function(value) {
					volumeStage = value;
					memory.setItem('volumeStage', value);
				},
				get: function() {
					return volumeStage;
				}
			};
		})();

		jQuery.fn.pilimusic = function(options) {
			var defaults = {};
			var $opts = $.extend({}, defaults, options);

			return this.each(function(index, t) {
				var $bk = $('.bk'),
					$u = $(this),
					firstLoad = true,
					imgWidth,
					$refreshButton,
					currentSound,
					$musicthumb = $('#musicthumb'),
					$musictitle = $('#musictitle'),
					$playnow = $('#playnow'),
					$playbackward = $('#playbackward'),
					$playforward = $('#playforward'),
					$remainProgress = $('#remainProgress'),
					$nowProgress = $('#nowProgress'),
					progressBar = new ProgressBar($remainProgress, $nowProgress),
					$playTime = $('#playTime'),
					$ls,
					len,
					centerPoint,
					$listbtn = $('#listbtn'),
					$volume = $('#volume'),
					$volumeBtn = $volume.find('span').first(),
					$volumeBar = $('#volumeBar'),
					$volumeCircle = $('#volumeCircle');

				var Volume = (function() {
					var started = false,
						beginLeft = $volumeBar.offset().left,
						endLeft = $volumeBar.offset().left + $volumeBar.width() - $volumeCircle.width(),
						all = endLeft - beginLeft,
						volumeStage = VolumeStorage.get() || 1,
						offsetX = 0;
					$volumeCircle.css({
						left: all * volumeStage
					});

					function percent(stage) {
						return (stage / all).toFixed(2);
					};

					return {
						start: function(e) {
							started = true;
							offsetX = e.offsetX || e.originalEvent.layerX;
							$volumeCircle.css({
								left: e.pageX - beginLeft - offsetX
							});
						},
						move: function(fn) {
							return function(e) {
								if (started) {
									if (e.pageX <= endLeft && e.pageX >= beginLeft) {
										var offsetLeft = e.pageX - beginLeft - offsetX;
										offsetLeft = offsetLeft < 0 ? 0 : offsetLeft;
										volumeStage = percent(offsetLeft);
										$volumeCircle.css({
											left: offsetLeft
										});
									} else if (e.pageX > endLeft) {
										volumeStage = 1;
										$volumeCircle.css({
											left: endLeft - beginLeft
										});
									} else if (e.pageX < beginLeft) {
										volumeStage = 0;
										$volumeCircle.css({
											left: 0
										});
									}
									volumeStage = volumeStage < 0 ? 0 : (volumeStage > 1 ? 1 : volumeStage);
									if (fn)
										fn(volumeStage);
								}
							}
						},
						end: function() {
							started = false;
							offsetX = 0;
						},
						getVolumeStage: function() {
							return volumeStage;
						}
					};
				})();
				$('body').on('mousemove', Volume.move(function(volumeStage) {
					VolumeStorage.set(volumeStage);
					if (currentSound)
						soundInstanceCollection.get(currentSound).setVolume(VolumeStorage.get());
					if (volumeStage == 0) {
						if (!$volumeBtn.hasClass(cssConfig.volumeOff)) {
							$volumeBtn.addClass(cssConfig.volumeOff);
						}
						$volumeBtn.removeClass(cssConfig.volumeUp);
					} else {
						if (!$volumeBtn.hasClass(cssConfig.volumeUp)) {
							$volumeBtn.addClass(cssConfig.volumeUp);
						}
						$volumeBtn.removeClass(cssConfig.volumeOff);
					}
				}));
				$('body').on('mouseup', Volume.end);
				$volumeCircle.on('mousedown', Volume.start).on('mouseup', Volume.end);

				function getLiByDataId(id) {
					return $u.find('li[data-id=' + id + ']');
				};

				function playforward(id) {
					id = id ? id : currentSound;
					if (firstLoad === true) {
						var nextSoundInstance = soundInstanceCollection.getNext(id);
						if (nextSoundInstance) {
							getLiByDataId(nextSoundInstance.id).trigger('play');
						}
					} else {
						var nextSoundInstance = soundInstanceCollection.getPre(id);
						if (nextSoundInstance) {
							getLiByDataId(nextSoundInstance.id).trigger('play');
						}
					}
				};

				function playbackward(id) {
					id = id ? id : currentSound;
					if (firstLoad === true) {
						var nextSoundInstance = soundInstanceCollection.getPre(id);
						if (nextSoundInstance) {
							getLiByDataId(nextSoundInstance.id).trigger('play');
						}
					} else {
						var nextSoundInstance = soundInstanceCollection.getNext(id);
						if (nextSoundInstance) {
							getLiByDataId(nextSoundInstance.id).trigger('play');
						}
					}
				};

				$playnow.on('click', function(e, param) {
					if (currentSound) {
						var $current_li = getLiByDataId(currentSound);
						if ($playnow.hasClass(cssConfig.play)) {
							if (param !== false) {
								$current_li.trigger('play');
							}
						} else if ($playnow.hasClass(cssConfig.pause)) {
							$current_li.trigger('pause');
						}
					}
				}).on('pause', function() {
					$playnow.addClass(cssConfig.pause);
					$playnow.removeClass(cssConfig.play);
				}).on('play', function() {
					$playnow.addClass(cssConfig.play);
					$playnow.removeClass(cssConfig.pause);
				});

				$playforward.on('click', function() {
					$playnow.trigger('click', false);
					playforward();
				});

				$playbackward.on('click', function() {
					$playnow.trigger('click', false);
					playbackward();
				});

				var rotateControllerCollection = new RotateControllerCollection(),
					soundInstanceCollection = new SoundCollection(),
					queue = new createjs.LoadQueue();
				queue.setMaxConnections(1);
				queue.installPlugin(createjs.Sound);
				queue.on("complete", handleComplete);
				queue.on("fileload", function(e) {
					$playTime.html('0:00/' + convertTime(e.result.duration));
					var remainProgress = 0,
						nowProgress = 0,
						_tag = e.item._loader._tag;
					soundInstanceCollection.get(e.item.id).tag = _tag;
					_tag.addEventListener('timeupdate', createjs.proxy(throttle(function(e) {
						if (_tag) {
							var currentTime = Math.floor(_tag.currentTime),
								duration = Math.floor(_tag.duration);
							$playTime.html(convertTime(currentTime) +
								'/' + convertTime(duration));
							nowProgress = (currentTime / duration * 100).toFixed(2);
							if (nowProgress === 100) {
								progressBar.setNowProgress(0);
								progressBar.setRemainProgress(100);
							} else {
								progressBar.setNowProgress(nowProgress);
								progressBar.setRemainProgress(remainProgress - nowProgress);
							}
						}
					}, 1)));
					_tag.addEventListener('progress', createjs.proxy(throttle(function(id) {
						var animationStartValue = 0.0;
						return function(e) {
							if (_tag) {
								var progress = _tag.buffered.end(0) / _tag.duration,
									$li = getLiByDataId(id);
								$li.circleProgress({
									value: progress,
									animationStartValue: animationStartValue
								});
								remainProgress = (100 * progress).toFixed(2);
								progressBar.setRemainProgress(remainProgress - nowProgress);
								animationStartValue = progress;
								if (progress === 1)
									$remainProgress.removeClass('active');
								else {
									if (!$remainProgress.hasClass('active'))
										$remainProgress.addClass('active');
								}
								console.log(id + " is loaded " + progress);
							}
						};
					}(e.item.id), 1)));
					_tag.addEventListener('ended', createjs.proxy(function(id) {
						return function() {
							var $li = getLiByDataId(id);
							$li.trigger('pause');
							rotateControllerCollection.get(id).reset0();
							playforward(id);
						};
					}(e.item.id)));
				});

				createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);

				function handleComplete(event) {
					var id = queue._loadedScripts[queue._loadedScripts.length - 1].id,
						$li = getLiByDataId(id),
						sound = createjs.Sound.play(id);
					soundInstanceCollection.get(id).sound = sound;
					soundInstanceCollection.get(id).setVolume();
					rotateControllerCollection.get(id).rotate360();
					$li.trigger('instance');
					$li.attr('data-firstplay', false);
					$playnow.trigger('pause');
				};

				function bindAction($li) {
					var soundInstance,
						rotateController,
						id = $li.attr('data-id'),
						$li = $li,
						$rotation = $li.find('.rotation'),
						$img = $li.find('img'),
						clickCount = 0,
						firstPlay = $li.attr('data-firstplay');

					rotateController = new RotateController(id, $rotation);
					rotateControllerCollection.add(rotateController);
					$li.bind("click", function() {
						if (clickCount === 0) {
							getLiByDataId(currentSound).trigger('pause');
							$li.trigger("play");
						} else {
							$li.trigger("pause");
						}
					}).bind("pause", function(evt) {
						if (soundInstance) {
							soundInstance.pause();
							rotateController.stop();
							clickCount = 0;
						}
						$li.removeClass('active');
						$img.removeClass('active');
						$playnow.trigger('play');
					}).bind("play", function(evt) {
						if (!firstPlay) {
							soundInstance = soundInstanceCollection.get(id);
							if (soundInstance) {
								if (!soundInstance.hasPlaybackResource())
									soundInstance.play();
								else
									soundInstance.resume();
								rotateController.rotate360();
							}
							$playnow.trigger('pause');
						} else {
							progressBar.clearAll();
							queue.loadFile({
								id: id,
								src: $li.attr('data-path'),
								type: createjs.AbstractLoader.SOUND,
								maintainOrder: true,
								size: $li.attr('data-size')
							}, true);
						}
						$li.addClass('active');
						$img.addClass('active');
						firstPlay = false;
						clickCount = 1;
						currentSound = id;
						$musicthumb.attr('src', $li.attr('data-img'));
						if (!vagueToggle.exist()) {
							vagueToggle.init(function() {
								var vague = $bk.Vague({
									intensity: 30,
									forceSVGUrl: false,
									animationOptions: {
										duration: 1000,
										easing: 'linear'
									}
								});
								vague.blur();
								return vague;
							}(), function() {
								$bk.css({
									backgroundImage: 'url(' + $li.attr('data-img') + ')'
								});
							});
						} else {
							vagueToggle.regist('changeBk', function() {
								$bk.css({
									backgroundImage: 'url(' + $li.attr('data-img') + ')'
								});
							});
						}
						$musictitle.html($li.attr('data-title'));
						vagueToggle.trigger('changeBk', true);
					}).bind('instance', function() {
						soundInstance = soundInstanceCollection.get(id);
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

				function listProxy(sort) {
					var listed = false,
						totalTime = 400,
						eachTime = totalTime / len;
					var uStyle = {
						width: $u.width(),
						height: $u.height()
					};
					var $firstLi = getLiByDataId(soundInstanceCollection.getFirstId());
					var _width = $firstLi.width();
					var gapWidth = (uStyle.width - (len * _width)) / (len - 1);
					var positions = [];
					var _top = (uStyle.height - _width) / 2;
					for (var i = 0; i < len; i++) {
						if (sort === true) {
							if (i === 0)
								positions.push({
									top: _top,
									left: uStyle.width - _width
								});
							else {
								var prePosition = positions[positions.length - 1];
								positions.push({
									top: _top,
									left: prePosition.left - gapWidth - _width
								});
							}
						} else {
							if (i === 0)
								positions.push({
									top: _top,
									left: 0
								});
							else {
								var prePosition = positions[positions.length - 1];
								positions.push({
									top: _top,
									left: prePosition.left + gapWidth + _width
								});
							}
						}
					}
					var backPositions = [];
					return function() {
						if (listed === false) {
							async.mapLimit(soundInstanceCollection.collection, 1, function(c, callback) {
								var index = soundInstanceCollection.indexes[c.id];
								setTimeout(function() {
									callback();
								}, 100);
								var $li = getLiByDataId(c.id);
								backPositions.push({
									top: $li.position().top,
									left: $li.position().left
								});
								$li.fly({
									start: backPositions[index],
									end: positions[index],
									autoPlay: true,
									speed: 1.1,
									vertex_Rtop: 0,
									onEnd: function() {
										if (!CnknotCollection.exist(c.id)) {
											var $cnknot = $('.z').first().clone(true);
											$('body').append($cnknot);
											var cnknot = new CnKnot(c.id, $cnknot);
											CnknotCollection.add(cnknot);
											cnknot.reset();
											cnknot.show();
										} else {
											CnknotCollection.get(c.id).show();
										}
									}
								});
							}, function() {
								if (index === 0) {
									listed = true;
									$listbtn.attr('data-listed', listed);
								}
							});
						} else {
							async.mapLimit(soundInstanceCollection.collection, 1, function(c, callback) {
								CnknotCollection.get(c.id).hide();
								setTimeout(function() {
									var index = soundInstanceCollection.indexes[c.id];
									setTimeout(function() {
										callback();
									}, 100);
									var $li = getLiByDataId(c.id);
									$li.fly({
										start: positions[index],
										end: backPositions[index],
										autoPlay: true,
										speed: 1.1,
										vertex_Rtop: 0,
										onEnd: function() {}
									});
								}, 500);
							}, function() {
								if (index === 0) {
									listed = false;
									$listbtn.attr('data-listed', listed);
								}
							});
						}
					};
				};

				function refreshList() {
					CnknotCollection.hideAll();
					$listbtn.unbind('click');
					firstLoad = false;
					clearAudioTags();
					$refreshButton.unbind('click', refreshList);
					$playnow.trigger('play');
					queue.close();
					queue.removeAll();
					rotateControllerCollection.resetAll(function() {
						rotateControllerCollection.removeAll();
					});
					soundInstanceCollection.removeAll();

					async.mapLimit($ls, 1, function(other, callback) {
						var other = $(other);
						if (other.attr('data-id') === currentSound)
							other.trigger("pause");
						other.unbind('click');
						other.unbind('pause');
						other.unbind('play');
						other.unbind('instance');
						callback();
					}, function() {
						// 延迟
						setTimeout(function() {
							progressBar.clearAll();
							currentSound = null;
						}, 10);
					});
					var animateIndex = 0,
						_height = $ls.eq(0).height(),
						_r = _height / 4,
						r = $u.height() / 4 - _r;
					async.mapLimit($ls, 1, function(li, callback) {
						var index = animateIndex;
						setTimeout(function() {
							if (animateIndex <= len - 1)
								animateIndex++;
							callback();
						}, 100);
						var $li = $(li),
							position = getPosition(animateIndex, r);
						$li.animate({
							left: position.x - _r,
							top: position.y - _r,
							width: _height / 2,
							height: _height / 2
						}, {
							easing: 'easeInBack',
							duration: 300,
							complete: function() {
								if (index + 1 === animateIndex && animateIndex === len) {
									load();
									animateIndex = 0;
								}
							}
						});
						$li.queue(function() {
							$(this).dequeue();
						});
					}, function(err, results) {
						console.log('the <li>s all animated.');
					});
				};

				function done(data, status) {
					//返回列表成功
					if (status === "success") {
						if (data) {
							var arr = [];
							for (var i = 0; i < data.length; i++) {
								var d = data[i],
									imgPath = config.file_server + encodeURIComponent(d.imgPath),
									dataPath = config.file_server + d.path,
									dataId = config.sound + d.id,
									$li, $box, $rotation, $img;
								if (firstLoad) {
									$li = $('<li></li>');
									$u.append($li);
									$box = $("<div class=\"box\"></div>");
									$li.append($box);
									$rotation = $('<div class=\"rotation\"></div>');
									$box.append($rotation);
									$img = $("<img/>");
									$rotation.append($img);
								} else {
									$li = $u.find('li').eq(i);
									$box = $li.find('div');
									$img = $box.find('img');
								}
								$li.attr({
									'data-title': d.title,
									'data-id': dataId,
									'data-firstPlay': true,
									'data-img': imgPath,
									'data-path': dataPath,
									'data-size': d.size
								});
								$box.attr('title', d.title);
								$img.attr('src', imgPath);
								soundInstanceCollection.add(new SoundInstance(dataId));
								bindAction($li);

								if (i === 0) {
									$musicthumb.attr('src', imgPath);
									$musicthumb.attr('alt', d.title);
									$musictitle.html(d.name);
									currentSound = dataId;
								}
							}
							if (!$ls) {
								$ls = $u.children("li");
								len = $ls.length;
							}
							if (firstLoad === true) {
								getLiByDataId(soundInstanceCollection.getFirst().id).trigger('play');
								$listbtn.on('click', listProxy(true));
							} else {
								getLiByDataId(soundInstanceCollection.getLast().id).trigger('play');
							}
							if (!centerPoint)
								centerPoint = {
									x: $u.width() / 2,
									y: $u.height() / 2
								};


							if (!$refreshButton) {
								$refreshButton = $("<span title=\"刷新音乐列表\" class=\"refresh-btn\"><i class=\"glyphicon glyphicon-refresh\"></i></span>")
								/*刷线按钮插入文档中*/
								$refreshButton.insertAfter($u);
								$refreshButton.css({
									left: centerPoint.x - $refreshButton.width() / 2 + $u.position().left,
									top: centerPoint.y - $refreshButton.height() / 2 + $u.position().top
								});
							}
							if (firstLoad) {
								$refreshButton.bind('click', refreshList);

								$ls.each(function(index, li) {
									$li = $(li);
									var _height = $ls.eq(0).height(),
										_r = _height / 2,
										r = $u.height() / 2 - _r,
										position = getPosition(index, r);
									$li.css({
										left: position.x - _r,
										top: position.y - _r
									});
									$li.circleProgress({
										value: 0,
										size: 100,
										thickness: 3,
										fill: {
											gradient: ['#0099CC']
										},
										startAngle: -Math.PI / 2
									});
								});
							} else {
								var animateIndex = 0,
									_height = $ls.eq(0).height(),
									_r = _height * 2 / 2,
									r = $u.height() / 2 - _r;
								async.mapLimit((function() {
									var arr = [];
									for (var i = $ls.length - 1; i >= 0; i--) {
										arr.push($($ls[i]));
									}
									return arr;
								})(), 1, function(li, callback) {
									var $li = $(li);
									var index = animateIndex;
									setTimeout(function() {
										if (animateIndex <= len - 1)
											animateIndex++;
										callback();
									}, 100);
									var position = getPosition(animateIndex, r);
									$li.animate({
										left: position.x - _r,
										top: position.y - _r,
										width: _height * 2,
										height: _height * 2
									}, {
										easing: 'easeInOutBack',
										duration: 300,
										queue: true,
										complete: function() {
											$li.circleProgress({
												value: 0,
												startAngle: -Math.PI / 2,
												animationStartValue: 0,
												animation: {
													duration: 0
												}
											});
											if (index + 1 === animateIndex && animateIndex === len) {
												console.log($li.attr('data-id'));
												setTimeout(function() {
													$refreshButton.bind('click', refreshList);
													animateIndex = 0;
													$listbtn.on('click', listProxy(false));
												}, 300)
											}
										}
									});
								});
							}
						}
					}
				};

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