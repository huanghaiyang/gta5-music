function IndexController() {};

IndexController.prototype.home = function(req, res, next) {
	res.render('index', {
		title: '系统管理后台'
	});
};

module.exports = IndexController;