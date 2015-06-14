var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/refresh', function(req, res, next) {
	res.send({
		url: '/file_server/霹雳英雄-神威破八荒(玄貘II).mp3'
	});
	res.end();
});

module.exports = router;