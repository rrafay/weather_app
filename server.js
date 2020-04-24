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


//3
// var connect = require('connect');
// var serveStatic = require('serve-static');

// connect()
//     .use(serveStatic(__dirname))
//     .listen(8080, () => console.log('Server running on 8080...'));

// //4
// var fs = require("fs");
// var host = "127.0.0.1";
// var port = 8080;
// var express = require("express");

// var app = express();
// app.use(express.static(__dirname + "/index.html")); //use static files in ROOT/public folder

// app.get("/", function(request, response){ //root dir
//     response.send("Hello!!");
// });

// app.listen(port, host);



var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic(__dirname, {'index': ['index.html']}));
app.listen(80);

//hi rafay