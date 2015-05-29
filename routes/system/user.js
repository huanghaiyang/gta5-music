var express = require('express');
var fs=require('fs');
var router = express.Router();

/* GET music page. */
router.get('/', function(req, res, next) {
	res.send({
		realName: "系统管理员"
	});
	res.end();
});

router.get("/menus", function(req, res, next) {
	var menuData=JSON.parse(fs.readFileSync('routes/system/json/menu.json'));
	res.send(menuData);
	res.end();
});

module.exports = router;