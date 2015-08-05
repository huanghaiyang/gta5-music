var express = require('express');
var router = express.Router();
var MusicController = require('../../controllers/app/music');
var musicController = new MusicController();

/*get some random musics*/
router.get('/random', musicController.random);

/*get a random music*/
router.get('/randomOne', musicController.randomOne);

router.get('/searchMusic', musicController.searchMusic);

router.get('/searchAlbum', musicController.searchAlbum);

router.get('/searchArtist', musicController.searchArtist);

module.exports = router;