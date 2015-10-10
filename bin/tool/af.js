/**
	此工具用来读取文件夹下的所有MP3文件，并且录入到数据库中
**/

var fs = require("fs");
var Promise = require("bluebird");
var async = require("async");

var commander = require('commander');
commander.option('-d --dirpath <dirpath>', 'set the music files dir path').parse(process.argv);

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbInfo = require('../../db/info');
var url = dbInfo.address;
var collection = 'musics';

var id3 = require("nodejs-id3-reader");
var dir = commander.dirpath ? commander.dirpath : __dirname.replace(/bin\/tool\//, '') + '/public/music';

var readdirPromise = Promise.promisify(fs.readdir);
/*读取文件夹下的所有mp3文件*/
readdirPromise(dir).then(function(files) {
	files = files.filter(function(filename) {
		return /\.(mp3)$/.test(filename);
	});
	/*var filesArray = [];
	for (var i = 0; i < files.length; i++) {
		if (!filesArray[Math.floor(i / 10)])
			filesArray[Math.floor(i / 10)] = [];
		filesArray[Math.floor(i / 10)][i % 10] = files[i];
	}
	console.log(filesArray);*/
	console.log(files.length);
	async.mapLimit(files, 10, function(filename, callback_) {
		console.log(filename);
		var imagesDir = dir + '/images/';
		if (!fs.existsSync(imagesDir))
			fs.mkdirSync(imagesDir);
		var fullpath = dir + "/" + filename;
		var imgPath = '/images/' + filename.replace(/.\w+$/, ".jpeg");
		/*读取mp3文件的标签*/
		id3.localTags(fullpath, function() {
			var tags = id3.getAllTags(fullpath);
			for (var t in tags) {
				if (t === "picture") {
					var dataBuffer = new Buffer(tags[t].data);
					/*将图片写到本地*/
					fs.writeFile(dir + imgPath, dataBuffer, function(err) {
						assert.equal(err, null);
						console.log("图片生成成功！");
					});
				}
			}
			var size = fs.statSync(fullpath).size;
			/*要保存的数据*/
			var music = {
				name: filename,
				artist: tags.artist,
				title: tags.title,
				album: tags.album,
				year: tags.year,
				comment: tags.comment,
				addDate: new Date(),
				path: filename,
				imgPath: imgPath,
				size: size,
				rand: Math.random()
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
							callback_();
						});
					else {
						db.close();
						callback_();
					}
				});
			});
		}, {
			tags: ["artist", "title", "album", "year", "comment", "picture"]
		});
	}, function(err) {

	});
}).
catch (SyntaxError, function(e) {
	console.log("File had syntax error", e);
}).
catch (function(e) {
	console.log("Error reading file", e);
});;