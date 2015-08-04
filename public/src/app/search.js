$(document).ready(function() {
	var $musicList = $('#musicList'),
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
			url: '/music/search'
		},
		searchData = {
			music: {
				keywords: params.keywords,
				page: 1,
				fetchSize: 10
			},
			album: {
				keywords: params.keywords,
				page: 1,
				fetchSize: 10
			},
			artist: {
				keywords: params.keywords,
				page: 1,
				fetchSize: 10
			}
		};

	function Tab($element) {
		this.$element = $element;
		this.status = Tab.status.unactived;
	};

	Tab.prototype = (function() {
		return {
			active: function() {
				this.$element.addClass(classConfig.li.active);
				this.status = Tab.status.actived;
			},
			disActive: function() {
				this.$element.removeClass(classConfig.li.active);
				this.status = Tab.status.unactived;
			}
		};
	}());

	Tab.status = {
		actived: 0,
		unactived: 1
	};

	var TabGroup = {
		group: {},
		add: function(i, tab) {
			this.group[i] = tab;
		},
		get: function(i) {
			return this.group[i];
		}
	};

	$listCatas.each(function(i) {
		$(this).data('index', i);
		TabGroup.add(i, new Tab($(this)));
	});

	TabGroup.group[0].active();

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

	function done(data, status) {

	};

	function loadList() {
		$.ajax({
			url: aj.url,
			data: {
				searchData: searchData
			},
			dataType: "json",
			type: 'POST'
		}).done(done);
	};

	loadList();
});