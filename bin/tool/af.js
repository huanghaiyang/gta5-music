var fs = require("fs");
var id3 = require("nodejs-id3-reader");
var dir = "E:/huanghaiyang/gta5-music/public/music";
fs.readdir(dir, function(err, files) {
	if (err) {
		throw err;
	} else {
		files.forEach(function(filename) {
			var fullpath = dir + "/" + filename;
			id3.localTags(fullpath, function() {
				var tags = id3.getAllTags(fullpath);
				for (var t in tags) {
					if (t === "picture") {
						var dataBuffer = new Buffer(tags[t].data);
						fs.writeFile(filename.replace(/.\w+$/, ".jpeg"), dataBuffer, function(err) {
							if (err) {
								throw err;
							} else {
								console.log("图片生成成功！");
							}
						});
					}
				}
			}, {
				tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"]
			});
		});
	}
});