var config = require('./config');
var PORT = config.port.file_server;
var MIME = require('./lib/mine');
var dir = process.argv[2];
var ROOT = dir ? dir : process.cwd();

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var realpath = pathname !== '/' ? ROOT + pathname : __filename;
    realpath = decodeURIComponent(realpath);
    var extname = path.extname(realpath).slice(1);
    var contentType = 'text/plain';

    if (extname && MIME[extname]) {
        contentType = MIME[extname];
    }

    fs.exists(realpath, function(exists) {
        if (exists) {
            fs.readFile(realpath, function(err, data) {
                if (err) throw err;

                response.writeHead(200, {
                    'Content-Type': contentType
                });
                response.write(data);
                response.end();
            });
        } else {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write('Not Found');
            response.end();
        }
    });

}).listen(PORT);

console.log('simple static file server runing at port: ' + PORT + '.');