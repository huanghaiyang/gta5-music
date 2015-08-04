var express = require('express');
var router = express.Router();
var IndexController = require('../../controllers/app/index');
var indexController = new IndexController();

/* GET home page. */
router.get('/', indexController.home);

router.get('/search', indexController.search);

module.exports = router;