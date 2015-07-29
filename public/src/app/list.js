$(document).ready(function() {
	var $musicList = $('#musicList'),
		$listCatas = $('.list-cata'),
		params;
	$listCatas.on('click', function() {
		var $self = $(this);
		$self.addClass('list-cata-acitve');
		$listCatas.each(function(i, l) {
			if ($(l) != $self) {
				$(l).removeClass('list-cata-acitve');
			}
		});
	});

	function loadList() {

	};
});