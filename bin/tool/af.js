var fs = require("fs");
var dir = "E:/huanghaiyang/gta5-music/public/music";
fs.readdir(dir, function(err, files) {
	if (err) {
		throw err;
	} else {
		files.forEach(function(filename) {
			fs.stat(dir + "/" + filename, function(err, stats) {
				if(err)
					throw err ;
				else
				{
					console.log(stats);
				}
			});
		});
	}
});