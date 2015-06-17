var Music = require('../../models/music');
var assert = require('assert');

function MusicController() {};

MusicController.prototype.random = function(req, res, next) {
	var number = req.query.number ? parseInt(req.query.number) : 10;
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
	var data = [];
	var ran = {};
	ran[op] = {};
	ran[yepo[op]] = {};
	ran[op][op] = random;
	ran[yepo[op]][yepo[op]] = random;

	Music.find({
		rand: ran[op]
	}).limit(number).exec(function(err, docs) {
		assert.equal(err, null);
		console.log('random ' + op + ' query success ' + 'with ' + docs.length + ' docs');
		if (docs) {
			if (docs.length < number) {
				data.push(docs);

				Music.find({
					rand: ran[yepo[op]]
				}).limit(number - docs.length).exec(function(err, docs) {
					assert.equal(err, null);
					console.log('random ' + yepo[op] + ' query success' + 'with ' + docs.length + ' docs');
					if (docs)
						data.push(docs);
					res.send(data);
					res.end();
				});
			} else {
				data = docs;
				res.send(data);
				res.end();
			}
		}
	});
};


module.exports = MusicController;