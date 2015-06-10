var express = require('express');
var router = express.Router();
var FileServerController = require('../../controllers/file_server');
var fileServerController = new FileServerController();

/* GET music. */
router.get('/:filename', fileServerController.get);

module.exports = router;