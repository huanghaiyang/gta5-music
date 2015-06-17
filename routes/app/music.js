var express = require('express');
var router = express.Router();
var MusicController = require('../../controllers/app/music');
var musicController = new MusicController();

/* GET home page. */
router.get('/random', musicController.random);

module.exports = router;