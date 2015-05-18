var http = require("http"),
fs = require("fs"),
querystring = require("querystring");

http.createServer(function(req, res) {
    var data = " ";


    // serve static form
    if (req.method == "GET") {
        getFile(__dirname + "/www/staticForm.html", res);
    }

    // handle POST request
    if (req.method == "POST") {
        req.on("data", function(chunk) {
            // attach chunk to data
            data += chunk;
        });
        req.on("end", function() {
            // get key:value pairs from received data
            var params = querystring.parse(data),
                userName = params.firstName + " " + params.lastName,
                html = "<!DOCTYPE html>" + "<html><head><title>Hello " + userName + "</title></head><body><h1>Hello, " + userName + "!</h1></body></html>";

            res.end(html);
        });
    }

}).listen(8000, "127.0.0.1");

function getFile(localPath, mimeType, res) {
    // read the file in and return it, or return a 500 if it can't be read
    fs.readFile(localPath, function (err, contents) {
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