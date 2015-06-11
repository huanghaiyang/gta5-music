var http = require('http');
var path = require('path');
var BufferHelper = require('bufferHelper');
var MIME = require('../lib/mine');
var config = require('../config');

/*资源服务器请求选项*/
var options = {
	hostname: 'localhost',
	port: config.port.file_server,
	method: 'GET',
	headers: {
		'Content-Type': 'text/html; charset=utf-8'
	}
};

function FileServerController() {};

FileServerController.prototype.get = function(req, res, next) {
	var filename = req.params.filename;
	options.path = "/" + encodeURIComponent(filename);

	/*请求*/
	var request = http.request(options, function(response) {
		console.log('STATUS: ' + response.statusCode);
		console.log('HEADERS: ' + JSON.stringify(response.headers));
		/*读取返回数据*/
		var bufferHelper = new BufferHelper();
		response.on("data", function(chunk) {
			bufferHelper.concat(new Buffer(chunk));
		});

		/*数据读取完成*/
		response.on("end", function() {
			/*文件类型*/
			var extname = path.extname(filename).slice(1);
			var contentType = 'text/plain';

			if (extname && MIME[extname]) {
				contentType = MIME[extname];
			}
			res.writeHead(200, {
				'Content-Type': contentType
			});
			/*写返回流*/
			res.write(bufferHelper.toBuffer());
			res.end();
		});
	});
	/*错误处理*/
	request.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		res.writeHead(404, {
			'Content-Type': 'text/plain'
		});
		res.write('Not Found');
		res.end();
	});
	request.end();
};

module.exports = FileServerController;