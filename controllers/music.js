var Music = require('../models/music');
var assert = require('assert');

function MusicController() {};

MusicController.prototype.query = function(req, res, next) {
	var page = req.query.page;
	var size = req.query.size;
	if (page >= 0 && size > 0) {
		Music.find().sort({
			addDate: 'asc'
		}).skip((page - 1) * size).limit(size).exec(function(err, result) {
			assert.equal(err, null);
			console.log('query success.');
			res.send(result);
			es.end();
		});
	} else {
		res.send([]);
		res.end();
	}
};


module.exports = MusicController;