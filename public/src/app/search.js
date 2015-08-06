$(document).ready(function() {
	var $listPanels = $('.list-panel'),
		$listCatas = $('.list-cata'),
		params = {},
		un = (function() {
			window.location.search.replace(/^\?/, '').split('&').forEach(function(value, index) {
				var arr = value.split(/=/);
				params[arr[0]] = decodeURIComponent(arr[1]);
			});
			return undefined;
		})(),
		classConfig = {
			li: {
				active: 'list-cata-active'
			}
		},
		aj = {
			music: '/music/searchMusic',
			album: '/music/searchAlbum',
			artist: '/music/searchArtist'
		},
		searchData = {
			music: {
				keywords: params.keywords,
				page: 1,
				size: 10
			},
			album: {
				keywords: params.keywords,
				page: 1,
				size: 10
			},
			artist: {
				keywords: params.keywords,
				page: 1,
				size: 10
			}
		}, status = {
			actived: 0,
			unactived: 1
		}, cata = {
			'0': 'music',
			'1': 'artist',
			'2': 'album'
		}, fileServer = {
			basePath: 'file_server/'
		};

	var SearchController = (function() {

		function loadList(url, data, callback) {
			$.ajax({
				url: url,
				data: data,
				dataType: "json",
				type: 'GET'
			}).done(callback);
		};

		function _concat(url, data) {
			return url + '?' + JSON.stringify(data).replace(/\{|\}|'|"/g, '').replace(/:/g, '=').replace(/,/g, '&');
		};

		var store = {};

		return {
			load: function(url, data, callback) {
				var uri = _concat(url, data);
				if (!store.uri)
					loadList(url, data, callback);
			}
		};
	})();


	var RenderFunction = (function() {
		var funcs = {};
		return {
			trigger: function(action) {
				funcs[action]();
			},
			regist: function(action, fn) {
				funcs[action] = fn;
			}
		};
	})();

	function Tab(index, $element) {
		this.$element = $element;
		this.status = Tab.status.unactived;
		this.cata = '';
		this.index = index;
	};

	Tab.prototype = (function() {
		return {
			active: function() {
				var self = this;
				self.$element.addClass(classConfig.li.active);
				self.status = Tab.status.actived;
				PanelGroup.get(self.index).active();
				SearchController.load(aj[self.cata], searchData[self.cata], function(data, status, promise) {
					if (status === 'success') {
						_.each(data.content, function(record, index) {
							MusicRecordGroup.add(self.cata, new MusicRecord(_.pick(record, function(value, key) {
								if (key === '_id' || key === 'addDate')
									return false;
								else
									return true;
							})));
						});
					}
				});
			},
			disActive: function() {
				this.$element.removeClass(classConfig.li.active);
				this.status = Tab.status.unactived;
				PanelGroup.get(this.index).disActive();
			}
		};
	}());

	Tab.status = status;

	Tab.cata = cata;

	var TabGroup = {
		group: {},
		add: function(i, tab) {
			this.group[i] = tab;
			this.group[i].cata = Tab.cata[i];
		},
		get: function(i) {
			return this.group[i];
		}
	};

	$listCatas.each(function(i) {
		$(this).data('index', i);
		TabGroup.add(i, new Tab(i, $(this)));
	});

	RenderFunction.regist('activeTabFirst', function() {
		TabGroup.group[0].active();
	});

	$listCatas.on('click', function() {
		var $self = $(this);
		$listCatas.each(function(i, l) {
			if ($(l).data('index') != $self.data('index')) {
				TabGroup.get($(l).data('index')).disActive();
			} else {
				TabGroup.get($self.data('index')).active();
			}
		});
	});

	function Panel(index, $element) {
		this.$element = $element;
		this.status = Panel.status.unactived;
		this.cata = '';
		this.index = index;
	};

	Panel.prototype = (function() {
		return {
			active: function() {
				this.$element.show();
				this.status = Tab.status.actived;
			},
			disActive: function() {
				this.$element.hide();
				this.status = Tab.status.unactived;
			},
			getElement: function() {
				return this.$element;
			}
		};
	}());

	Panel.status = status;

	Panel.cata = cata;

	var PanelGroup = {
		group: {},
		add: function(i, panel) {
			this.group[i] = panel;
			this.group[i].cata = Panel.cata[i];
		},
		get: function(i) {
			return this.group[i];
		}
	};

	$listPanels.each(function(i) {
		$(this).data('index', i);
		var panel = new Panel(i, $(this));
		PanelGroup.add(i, panel);
		panel.disActive();
		if (i === $listPanels.length - 1)
			RenderFunction.trigger('activeTabFirst');
	});

	function MusicRecord(data) {
		this.id = '';
		this.name = '';
		this.artist = '';
		this.album = '';
		this.path = '';
		this.imgPath = '';
		this.title = '';

		this.element = null;
		this.cata = '';

		var self = this;
		if (data) {
			self = _.mapObject(this, function(value, key) {
				return data[key];
			});
		}
		var F = function() {};
		F.prototype = MusicRecordProxy.prototype;
		self.__proto__ = new F().__proto__;
		return self;
	};

	function MusicRecordProxy() {};

	MusicRecordProxy.prototype = (function() {
		return {
			render: function() {
				this.element = new MusicRecordElement().create().append(PanelGroup.get(_.invert(cata)[this.cata]).getElement()).bind(this);
			}
		};
	})();

	var MusicRecordGroup = (function() {
		var group = (function() {
			return _.mapObject(_.invert(cata), function() {
				return [];
			});
		})();
		return {
			add: function(groupCata, record) {
				record.cata = groupCata;
				group[groupCata].push(record);
				record.render();
			}
		};
	})();

	function MusicRecordElement() {
		this.$element = null;
		this.$img = null;
		this.$autio = null;
	};

	MusicRecordElement.prototype = (function() {
		return {
			append: function($parent) {
				this.$element.appendTo($parent);
				return this;
			},
			create: function() {
				var $element = $('<li></li>'),
					$img = $('<img>'),
					$audio = $('<audio></audio>'),
					$modal = $('<div class="m-modal"></div>'),
					$play = $('<div class="m-play"></div>');

				$element.append($play);
				$element.append($modal);
				$element.append($img);
				$element.append($audio);

				this.$audio = $audio;
				this.$img = $img;
				this.$element = $element;
				this.$modal = $modal;
				this.$play = $play;

				this.$img.bind('mouseenter', function(ev) {

				});
				return this;
			},
			bind: function(record) {
				this.$img.attr({
					src: fileServer.basePath + encodeURIComponent(record.imgPath),
					title: record.title
				});

				/*this.$audio.attr({
					src: fileServer.basePath + record.path
				});*/
			}
		};
	})();

});