function IndexController() {};

IndexController.prototype.home = function(req, res, next) {
	res.render('index', {
		title: 'PILI-FM'
	});
};

IndexController.prototype.search = function(req, res, next) {
	res.render('search', {
		title: 'PILI-FM'
	});
};


module.exports = IndexController;