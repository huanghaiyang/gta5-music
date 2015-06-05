var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbInfo = require('../../db/info');
var url = dbInfo.address;
var collection = 'music';

var id3 = require("nodejs-id3-reader");
var dir = "E:/huanghaiyang/gta5-music/public/music";

/*读取文件夹下的所有mp3文件*/
fs.readdir(dir, function(err, files) {
	if (err) {
		throw err;
	} else {
		files.forEach(function(filename) {
			if (/.mp3$/.test(filename)) {
				var fullpath = dir + "/" + filename;
				/*读取mp3文件的标签*/
				id3.localTags(fullpath, function() {
					var tags = id3.getAllTags(fullpath);
					for (var t in tags) {
						if (t === "picture") {
							var dataBuffer = new Buffer(tags[t].data);
							/*将图片写到本地*/
							fs.writeFile(dir + '/' + filename.replace(/.\w+$/, ".jpeg"), dataBuffer, function(err) {
								assert.equal(err, null);
								console.log("图片生成成功！");
							});
						}
					}

					/*要保存的数据*/
					var music = {
						name: filename,
						artist: tags.artist,
						title: tags.title,
						album: tags.album,
						year: tags.year,
						comment: tags.comment,
						add: new Date(),
						path: fullpath
					};

					/*插入一条数据*/
					var insertMusic = function(db, callback) {
						db.collection(collection).insertOne(music, function(err, result) {
							assert.equal(err, null);
							console.log("Inserted a document into the music collection.");
							callback(result);
						});
					};
					/*根据名称查找一条数据*/
					var findMusic = function(db, callback) {
						db.collection(collection).findOne({
							name: filename
						}, function(err, result) {
							assert.equal(err, null);
							console.log("finding music without error.");
							callback(result);
						});
					};
					/*打开数据库连接并操作*/
					MongoClient.connect(url, function(err, db) {
						assert.equal(err, null);
						console.log("connect success.");
						findMusic(db, function(result) {
							if (result === null)
								insertMusic(db, function() {
									db.close();
								});
							else
								db.close();
						});
					});
				}, {
					tags: ["artist", "title", "album", "year", "comment", "picture"]
				});
			}
		});
	}
});