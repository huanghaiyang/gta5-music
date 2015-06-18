(function($) {
	$.ajax({
		url: "/music/random",
		data: {
			number: 6
		},
		dataType: "json",
		type: 'GET'
	}).done(function(data, status) {
		var me = $('#me');
		var eleArr = [];

		var queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.on("complete", handleComplete, this);

		function handleComplete() {
			for (var i in eleArr) {
				me.append(eleArr[i]);
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
		};

		if (status === "success") {
			if (data) {

				for (var i = 0; i < data.length; i++) {
					var d = data[i];
					queue.loadFile({
						id: "sound_" + d.id,
						src: 'file_server/' + d.path
					});
					eleArr.push($('<li data-title="' + d.title + '" data-id="' + d.id + '"></li>'));
				}
			}
		}
	});
})(jQuery);