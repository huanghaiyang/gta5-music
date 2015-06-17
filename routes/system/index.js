var express = require('express');
var router = express.Router();
var IndexController = require('../../controllers/system/index');
var indexController = new IndexController();

/* GET home page. */
router.get('/', indexController.home);

module.exports = router;