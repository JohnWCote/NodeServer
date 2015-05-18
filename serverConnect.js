/* JohnWayne
 */
var require = require("requirejs");
var connect = require("connect");

connect(connect.static(__dirname + "/www"),
    // create a router to handle application paths
    connect.router(function(app) {
        app.get("/goNode/:firstName/:lastName", function (req, res) {
            var userName = req.params.firstName + " " + req.params.lastName,
                html = "<!DOCTYPE html>" + "<html><head><title>Hello " + userName + "</title>" +
                    "</head>" + "<body><h1>Hello, " + userName + "!</h1></body></html>";

            res.end(html);
        });
    })
).listen(8000, "127.0.0.1");

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