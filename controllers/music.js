var Music = require('../models/music');
var assert = require('assert');
var DateUtils = require('../lib/date-utils');
var RegExpUtils = require('../lib/regexp-utils');

function MusicController() {};

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


module.exports = MusicController;