function IndexController() {};

IndexController.prototype.home = function(req, res, next) {
	res.render('index', {
		title: 'PILI-FM'
	});
};

module.exports = IndexController;