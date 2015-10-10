var Music = require('../../models/music');
var assert = require('assert');
var Promise = require('bluebird');
var async = require("async");
var ObjectUtils = require('../../lib/object-utils');
var RegExpUtils = require('../../lib/regexp-utils');
var DateUtils = require('../../lib/date-utils');

function MusicController() {
	// 最多随机数
	this.maxNumber = 8;
};

/*随机查询一条记录*/

function randomOne(next) {
	return new Promise(function(resolve, reject) {
		var yepo = {};
		var op = "";
		if (Math.random() >= 0.5) {
			op = "$gte";
			yepo[op] = "$lte";
		} else {
			op = "$lte";
			yepo[op] = "$gte";
		}

		var random = Math.random();
		var ran = {};
		ran[op] = {};
		ran[yepo[op]] = {};
		ran[op][op] = random;
		ran[yepo[op]][yepo[op]] = random;

		try {
			Music.find({
				rand: ran[op]
			}).limit(1).sort({
				rand: op === '$gte' ? 'asc' : 'desc'
			}).select('name title artist year path imgPath album size').exec(function(err, docs) {
				assert.equal(err, null);
				console.log('random ' + op + ' query success ' + 'with ' + docs.length + ' docs');
				if (docs) {
					if (docs.length < 1) {
						Music.find({
							rand: ran[yepo[op]]
						}).limit(1).sort({
							rand: yepo[op] === '$gte' ? 'asc' : 'desc'
						}).select('name title artist year path imgPath album size').exec(function(err, docs) {
							assert.equal(err, null);
							console.log('random ' + yepo[op] + ' query success' + 'with ' + docs.length + ' docs');
							resolve(docs);
						});
					} else {
						resolve(docs);
					}
				}
			});
		} catch (e) {
			reject(e);
		}
	});
};

/*随机查询一条记录并返回*/
MusicController.prototype.randomOne = function(req, res, next) {
	randomOne().then(function(data) {
		if (data && data.length === 1) {
			data = data[0];
			res.send(data);
		} else {
			res.send(null);
		}
		res.end();
	}).error(function(err) {
		console.log(err);
		throw err;
	});
};

function random(number) {
	return new Promise(function(resolve, reject) {
		var arr = [];
		async.forever(function(next) {
			async.mapLimit((function() {
				var iterator = [];
				for (var i = 0; i < number - arr.length; i++)
					iterator.push(i);
				return iterator;
			})(), 1, function(i, callback) {
				randomOne().then(function(data) {
					if (data && data.length === 1) {
						data = data[0];
						var flag = false;
						if (arr.length === 0)
							arr.push(data);
						else {
							var flag = true;
							for (var j in arr) {
								if (arr[j].id === data.id) {
									flag = false;
									break;
								}
							}
							if (flag)
								arr.push(data);
						}
					}
					callback();
				}).error(function(err) {
					console.log(err);
					callback();
					reject(err);
					throw err;
				});
			}, function() {
				if (arr.length < number) {
					next();
				} else {
					resolve(arr.sort(ObjectUtils.randomSort));
				}
			});
		});
	});
};

/*随机查询多条记录并返回*/
MusicController.prototype.random = function(req, res, next) {
	var number = req.query.number ? parseInt(req.query.number) : 10;
	if (number > this.maxNumber)
		number = this.maxNumber;
	random(number).then(function(data) {
		res.send(data);
		res.end();
	}).error(function(err) {
		console.log(err);
		throw err;
	});;
};

function searchMusic(keywords, page, size) {
	return new Promise(function(resolve, reject) {

		var conditions = {
			title: new RegExp(RegExpUtils.parse(keywords), "gi")
		};
		if (page >= 1 && size > 0) {
			Music.find(conditions).sort({
				addDate: 'asc'
			}).skip((page - 1) * size).limit(size).select('name title artist album path imgPath addDate').exec(function(err, result) {
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
					page: page,
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

					resolve(obj);
				});

			});
		} else {
			resolve({
				size: 0,
				content: [],
				page: page,
				sort: ''
			});
		}
	});
};

function searchArtist(keywords, page, size) {
	return new Promise(function(resolve, reject) {

		var conditions = {
			name: new RegExp(RegExpUtils.parse(keywords), "gi")
		};
		if (page >= 1 && size > 0) {
			Artist.find(conditions).distinct('name').sort({
				name: 'asc'
			}).skip((page - 1) * size).limit(size).select('name imgPath').exec(function(err, result) {
				assert.equal(err, null);
				console.log('query success.');

				var content = JSON.parse(JSON.stringify(result));
				console.log(content);

				var obj = {
					size: size,
					content: content,
					page: page
				};

				Artist.count(conditions, function(err, count) {
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

					resolve(obj);
				});

			});
		} else {
			resolve({
				size: 0,
				content: [],
				page: page
			});
		}
	});

};

function searchAlbum(keywords, page, size) {
	return new Promise(function(resolve, reject) {

		var conditions = {
			name: new RegExp(RegExpUtils.parse(keywords), "gi")
		};
		if (page >= 1 && size > 0) {
			Album.find(conditions).sort({
				name: 'asc'
			}).skip((page - 1) * size).limit(size).select('name imgPath').exec(function(err, result) {
				assert.equal(err, null);
				console.log('query success.');

				var content = JSON.parse(JSON.stringify(result));
				console.log(content);

				var obj = {
					size: size,
					content: content,
					page: page
				};

				Album.count(conditions, function(err, count) {
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

					resolve(obj);
				});

			});
		} else {
			resolve({
				size: 0,
				content: [],
				page: page
			});
		}
	});

};

MusicController.prototype.searchMusic = function(req, res) {
	var keywords = req.query.keywords;
	var page = req.query.page;
	var size = req.query.size;
	searchMusic(keywords, page, size).then(function(data) {
		res.send(data);
		res.end();
	}).
	catch (function() {});
};

MusicController.prototype.searchAlbum = function(req, res) {
	var keywords = req.query.keywords;
	var page = req.query.page;
	var size = req.query.size;
	searchAlbum(keywords, page, size).then(function(data) {
		res.send(data);
		res.end();
	}).
	catch (function() {});
};

MusicController.prototype.searchArtist = function(req, res) {
	var keywords = req.query.keywords;
	var page = req.query.page;
	var size = req.query.size;
	searchArtist(keywords, page, size).then(function(data) {
		res.send(data);
		res.end();
	}).
	catch (function() {});
};


module.exports = MusicController;