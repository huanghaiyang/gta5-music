var fs = require("fs");
var id3 = require("./lib/JavaScript-ID3-Reader/dist/id3-minimized");
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
					var music = {}; 
					music.name = filename;
					music.title = tags.title;
					music.artist = tags.artist; 
					music.album =tags.album;
					music.comment = tags.v2.comments || tags.v1.comment;
					music.year = tags.year;
					console.log(tags);
				}
			});
		});
	}
});