var express = require('express');
var router = express.Router();
var MusicController = require('../../controllers/app/music');
var musicController = new MusicController();

/*get some random musics*/
router.get('/random', musicController.random);

/*get a random music*/
router.get('/randomOne', musicController.randomOne);

router.post('/search' , musicController.search);

module.exports = router;