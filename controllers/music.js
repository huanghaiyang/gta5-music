var Music = require('../models/music');
var assert = require('assert');

function MusicController() {};

MusicController.prototype.query = function(req, res, next) {
	var page = parseInt(req.query.page);
	var size = parseInt(req.query.size);
	if (page >= 0 && size > 0) {
		Music.find().sort({
			addDate: 'asc'
		}).skip((page - 1) * size).limit(size).exec(function(err, result) {
			assert.equal(err, null);
			console.log('query success.');

			var obj = {
				size: size,
				content: result,
				number: page,
				sort: "addDate"
			};

			Music.count({}, function(err, count) {
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