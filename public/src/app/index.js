(function($) {
	$.ajax({
		url: "/music/random",
		data: {
			number: 10
		},
		dataType: "json",
		type: 'GET'
	}).done(function(err, data) {
		
	});
})(jQuery);