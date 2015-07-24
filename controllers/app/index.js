function IndexController() {};

IndexController.prototype.home = function(req, res, next) {
	res.render('index', {
		title: 'PILI-FM'
	});
};

IndexController.prototype.list = function(req, res, next) {
	res.render('list', {
		title: 'PILI-FM'
	});
};


module.exports = IndexController;