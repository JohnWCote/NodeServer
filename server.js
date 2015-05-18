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

 // look at filename in URL, default to index.html
    var filename = path.basename(req.url) || "index.html",
        ext = path.extname(filename),
        dir = path.dirname(req.url).substring(1),
    // __dir name built-in variable containing path to code.
        localPath = __dirname + "/www/";
    if (extensions[ext]) {
        localPath += (dir ? dir + "/" : "") + filename;
        // verify that this file exists and load, else 404
        fs.exists(localPath, function(exists) {
            if (exists) {
                getFile(localPath, extensions[ext], res);
            } else {
                res.writeHead(404);
                res.end("404: Page not found");
            }
        });
    }
}).listen(8000, "127.0.0.1");  // port, "host" - 127.0.0.1:8000


function getFile(localPath, mimeType, res) {
    // read the file in and return it, or return a 500 if it can't be read
    fs.readFile(localPath, function(err, contents) {
        if (!err) {
            res.writeHead(200, {
                "Content-Type": mimeType,
                "Content-Length": contents.length
            });
            // if no error: Serve pages
            res.end(contents);
        } else {
            // if error: Serve 500: Internal Server Error
            res.writeHead(500);
            res.end();
        }
    });
}

console.log("Server Listening...");

// EOF.