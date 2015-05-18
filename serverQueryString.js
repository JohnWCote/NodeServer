/** NODE.js - server.js - JohnWayne **/


// Add module require js for using require()
var require = require("requirejs");
// Add module http for createServer()
var http = require("http");
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
    // allows for parsing after ? into key:value pairs.
    var qs = querystring.parse(req.url.split("?")[1]),
        // properties are the same as in the QueryString
    userName = qs.firstName + " " + qs.lastName,
        html = "<!DOCTYPE html>" + "<html><head><title>Hello " + userName + "</title></head>" + "<body><h1>Hello, " + userName + "!</h1></body></html>";
    res.end(html);
}).listen(8000, "127.0.0.1");

console.log("Server Listening...");

// EOF.