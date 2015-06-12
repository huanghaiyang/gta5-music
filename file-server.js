var commander = require('commander');
commander.option('-d --dirpath <dirpath>', 'set the music files dir path').parse(process.argv);
var dir = commander.dirpath;
if (!dir) {
    throw new Error('please use -d to set the dirpath.');
}
var config = require('./config');
var PORT = config.port.file_server;
var MIME = require('./lib/mine');
var ObjectUtils = require('./lib/object-utils');
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
            var range = request.headers.range;
            if (range) {
                range = ObjectUtils.parseInt(range.replace('bytes=', '').split(/-/));
            } else
                range = null;
            if (range) {
                fs.open(realpath, 'r', function(err, fd) {
                    if (err) throw err;
                    var data = fs.readFileSync(realpath);
                    if (data) {
                        if (!range[1])
                            range[1] = data.length;
                    }
                    console.log('range:' + range);
                    var size = Math.abs(range[1] - range[0]);
                    var bf = new Buffer(size);
                    fs.read(fd, bf, 0, size, range[0] , function(err, bytesRead, buffer) {
                        if (err) throw err;

                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        console.log('bytesRead:' + bytesRead);
                        console.log('data length:' + buffer.length);
                        response.write(buffer);
                        response.end();
                    });
                });

            } else {
                fs.readFile(realpath, function(err, data) {
                    if (err) throw err;

                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    console.log('data length:' + data.length);
                    response.write(data);
                    response.end();
                });
            }
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