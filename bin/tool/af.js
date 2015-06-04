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

			}, {
				tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"]
			});
		});
	}
});