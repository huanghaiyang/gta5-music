$(document).ready(function() {
	$.ajax({
		url: "/music/random",
		data: {
			number: 2
		},
		dataType: "json",
		type: 'GET'
	}).done(function(data, status) {
		var me = $('#me');
		var eleArr = [];

		var queue = new createjs.LoadQueue();
		queue.installPlugin(createjs.Sound);
		queue.on("fileload", handleFileLoad, this);
		queue.on("fileprogress", handleFileProgress, this);
		queue.on("complete", handleComplete, this);
		queue.on("progress", handleProgress, this);
		queue.on("error", handleError, this);

		function handleFileLoad(e) {
			var item = e.item; // A reference to the item that was passed in to the LoadQueue
			var type = item.type;

			// Add any images to the page body.
			if (type == createjs.LoadQueue.SOUND) {

			}
		};

		function handleFileProgress(e) {
			console.log(e.item.id + " is loaded " + e.progress);
		};

		function handleComplete(e) {
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

		function handleProgress(e) {
			console.log("Progress:", queue.progress, e.progress);
		};

		function handleError(e) {

		};

		if (status === "success") {
			if (data) {

				for (var i = 0; i < data.length; i++) {
					var d = data[i];
					queue.loadFile({
						id: "sound_" + d.id,
						src: 'file_server/' + d.path,
						type: createjs.AbstractLoader.SOUND
					});
					eleArr.push($('<li data-title="' + d.title + '" data-id="' + d.id + '"></li>'));
				}
			}
		}
	});
});