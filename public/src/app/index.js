(function($) {
	$.ajax({
		url: "/music/random",
		data: {
			number: 10
		},
		dataType: "json",
		type: 'GET'
	}).done(function(data, status) {
		var me = $('#me');
		if (status === "success") {
			if (data) {

				for (var i = 0; i < data.length; i++) {
					me.append($('<li><audio><source src="file_server/' + data[i].path + ' type="audio/mpeg"></source></audio></li>'));
				}
				var inter = setInterval(function() {
					if ($.fn.circle) {
						$('#me').circle({
							centerFill: true
						});
						clearInterval(inter);
						inter = null;
					}
				}, 10);
			}
		}
	});
})(jQuery);