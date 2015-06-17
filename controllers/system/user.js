var fs = require('fs');

function UserController() {};

UserController.prototype.loginUser = function(req, res, next) {
	res.send({
		realName: "系统管理员"
	});
	res.end();
};

UserController.prototype.menus = function(req, res, next) {
	var menuData = JSON.parse(fs.readFileSync('routes/system/json/menu.json'));
	res.send(menuData);
	res.end();
};

module.exports = UserController;