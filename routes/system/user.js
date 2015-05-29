var express = require('express');
var router = express.Router();

/* GET music page. */
router.get('/', function(req, res, next) {
	res.send({
		realName: "系统管理员"
	});
	res.end();
});

router.get("/menus", function(req, res, next) {
	res.send([{
		text: "音乐管理",
		id: 0,
		parentId: -1,
		hrefTarget: "",
		leaf: false,
		children: [{
			text: "音乐列表",
			id: 1,
			parentId: 0,
			hrefTarget: "",
			leaf: true
		}]
	}]);
	res.end();
});

module.exports = router;