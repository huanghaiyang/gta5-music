var fs = require("fs");
var id3 = require("id3js");
var dir = "E:/huanghaiyang/gta5-music/public/music";
fs.readdir(dir, function(err, files) {
	if (err) {
		throw err;
	} else {
		files.forEach(function(filename) {
			var fullpath = dir + "/" + filename;
			id3({
				file: fullpath,
				type: id3.OPEN_LOCAL
			}, function(err, tags) {
				if (err)
					throw err;
				else {

				}
			});
		});
	}
});