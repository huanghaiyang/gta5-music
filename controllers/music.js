var Music = require('../models/music');
var assert = require('assert');
var DateUtils = require('../lib/date-utils');
var RegExpUtils = require('../lib/regexp-utils');

function MusicController() {};

MusicController.prototype.get = function(req, res, next) {
	var id = req.params.id;
	Music.findOne({
		_id: id
	}, function(err, doc) {
		assert.equal(err, null);
		console.log('find success.');
		res.send(doc);
		res.end();
	});
};

MusicController.prototype.getSimple = function(req, res, next) {
	var id = req.params.id;
	Music.findOne({
		_id: id
	}).select("_id , name ,  title , path").exec(function(err, doc) {
		assert.equal(err, null);
		console.log('find success.');
		res.send(doc);
		res.end();
	});
};

MusicController.prototype.query = function(req, res, next) {
	var page = parseInt(req.query.page);
	var size = parseInt(req.query.size);

	var conditions = {};
	var name = req.query.name;
	if (name) {
		conditions.name = new RegExp(RegExpUtils.parse(name), "gi");
	}
	var title = req.query.title;
	if (title) {
		conditions.title = new RegExp(RegExpUtils.parse(title), "gi");
	}
	var age = req.query.age;
	if (age) {
		conditions.age = new RegExp(RegExpUtils.parse(age), "gi");
	}
	var artist = req.query.artist;
	if (artist) {
		conditions.artist = new RegExp(RegExpUtils.parse(artist), "gi");
	}

	if (page >= 0 && size > 0) {
		Music.find(conditions).sort({
			addDate: 'asc'
		}).skip((page - 1) * size).limit(size).exec(function(err, result) {
			assert.equal(err, null);
			console.log('query success.');

			var content = JSON.parse(JSON.stringify(result));
			console.log(content);

			for (var i = 0; i < result.length; i++) {
				content[i].addDate = DateUtils.Format(result[i].addDate, "yyyy-MM-dd HH:mm:ss");
			}

			var obj = {
				size: size,
				content: content,
				number: page,
				sort: "addDate"
			};

			Music.count(conditions, function(err, count) {
				assert.equal(err, null);
				console.log('count success.');
				obj.totalPages = count % size > 0 ? Math.floor(count / size) + 1 : count / size;
				obj.totalElements = count;
				if (page * size >= count)
					obj.last = true;
				else
					obj.last = false;
				if (page === 1)
					obj.first = true;
				else
					obj.first = false;

				res.send(obj);
				res.end();
			});

		});
	} else {
		res.send([]);
		res.end();
	}
};

MusicController.prototype.add = function(req, res, next) {
	var name = req.body.name;
	var title = req.body.title;

	var year = req.body.year;
	var artist = req.body.artist;
	var album = req.body.album;
	var comment = req.body.comment;

	if (!name || !title) {
		res.send({
			status: "alert",
			message: "必要信息为空!"
		});
		res.end();
	} else {
		var music = {
			name: name,
			title: title,
			year: year,
			artist: artist,
			album: album,
			comment: comment
		};
		Music.findOne({
			name: music.name
		}).exec(function(err, doc) {
			assert.equal(err, null);
			console.log('query success.');

			if (doc !== null) {
				res.send({
					status: "alert",
					message: "您添加的音乐文件已存在!"
				});
				res.end();
			} else {
				Music.create(music, function(err) {
					assert.equal(err, null);
					console.log('save success.');
					res.send({
						status: "info",
						message: "保存成功!"
					});
					res.end();
				});
			}
		});
	}
};

MusicController.prototype.delete = function(req, res, next) {
	var id = req.params.id;
	Music.remove({
		_id: id
	}, function(err) {
		assert.equal(err, null);
		console.log('delete success.');
		res.send({
			status: "info",
			message: "删除成功!"
		});
		res.end();
	});
};

MusicController.prototype.update = function(req, res, next) {
	var music = {
		_id: req.body._id,
		name: req.body.name,
		title: req.body.title,
		album: req.body.album,
		year: req.body.year,
		artist: req.body.artist,
		comment: req.body.comment
	};
	console.log(music);
	Music.findByIdAndUpdate(music._id, music, function(err) {
		assert.equal(err, null);
		console.log('update success.');
		res.send({
			status: "info",
			message: "更新成功!"
		});
		res.end();
	});
};

module.exports = MusicController;