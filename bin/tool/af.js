var fs = require("fs");
var dir = "E:/huanghaiyang/gta5-music/public/music";
fs.readdir(dir, function(err, files) {
	if (err) {
		throw err;
	} else {
		files.forEach(function(filename) {
			var fullpath = dir + "/" + filename;
		});
	}
});