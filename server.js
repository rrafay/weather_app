// var express = require('express');
// var app = express();
// app.use('/', express.static(__dirname + './index.html')); // ← adjust
// app.listen(3000, function() { console.log('listening'); });


// var http = require('http');
// var fs = require('fs');
// var index = fs.readFileSync('index.html');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end(index);
// }).listen(9615);

var connect = require('connect');
var serveStatic = require('serve-static');

connect()
    .use(serveStatic(__dirname))
    .listen(8080, () => console.log('Server running on 8080...'));