$(document).ready(function() {
	$.ajax({
		url: "/music/random?t=" + Math.random(),
		data: {
			number: 8
		},
		dataType: "json",
		type: 'GET'
	}).done(function(data, status) {
		var me = $('#me');
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
			var $li = me.find('li[data-id=' + e.item.id.replace(/^sound_/, "") + ']');
			$li.circleProgress({
				value: e.progress
			});
			if (e.progress === 1) {
				$li.addClass('normal');
				$li.data('status', 'loaded');
				$li.find('canvas').remove();
			}
			console.log(e.item.id + " is loaded " + e.progress);
		};

		function handleComplete(e) {

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
					me.append($('<li data-title="' + d.title + '" data-id="' + d.id + '" data-img="' + d.imgPath + '"></li>'));

					queue.loadFile({
						id: "sound_" + d.id,
						src: 'file_server/' + d.path,
						type: createjs.AbstractLoader.SOUND
					});
				}
				$('#me').circle({
					centerFill: true
				});
			}
		}
	});
});