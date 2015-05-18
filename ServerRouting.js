/** NODE.js - server.js - JohnWayne **/


// Add module require js for using require()
var require = require("requirejs");
// Add module http for createServer()
var http = require("http");
// Add module for url handling
var url = require("url");
// Add module for processing url queries
var querystring = require("querystring");
// Add module path for path completion
var path = require("path");
// Add module fs for file system access
var fs = require("fs");

extensions = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".jpg": "image/jpeg"
};

http.createServer(function(req, res) {
    // separate the path along /
   var path = url.parse(req.url).pathname.split("/");
    // handler for the GET request /goNode/
    if (req.method == "GET" && path[1] == "goNode") {
        var userName = path[2] + " " + path[3],
            html = "<!DOCTYPE html>" + "<html><head><title>Hello " + userName + "</title></head>" + "<body><h1>Hello, " + userName + "!</h1></body></html>";
        res.end(html);
    }
}).listen(8000, "127.0.0.1");

console.log("Server Listening...");

// set browser to 127.0.0.1:8000/goNode/Foo/Bar
// EOF.