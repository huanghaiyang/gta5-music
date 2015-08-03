$(document).ready(function() {
	var $musicList = $('#musicList'),
		$listCatas = $('.list-cata'),
		params, classConfig = {
			li: {
				active: 'list-cata-active'
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
				$(l).removeClass(classConfig.li.active);
			} else {
				$self.addClass(classConfig.li.active);
			}
		});
	});

	function loadList() {

	};
});