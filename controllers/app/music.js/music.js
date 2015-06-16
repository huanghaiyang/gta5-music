var Music = require('../models/music');
var assert = require('assert');

function MusicController(){};

MusicController.prototype.random = function(req , res  ,next){
	var number = req.query.number ? parseInt(req.query.number) : 10 ; 
	Music.find({random : {'$lte' : Math.random()}}).limit(number);
	Music.find({random : {'$gte' : Math.random()}}).limit(number);
};


module.exports = MusicController ; 