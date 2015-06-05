var express = require('express');
var router = express.Router();
var MusicController = require('../../controllers/music');
var musicController = new MusicController();

/* GET music page. */
router.get('/', musicController.query);

module.exports = router;