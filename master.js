// central server which just serializes and propagates updates

var http = require("http"),
    url  = require("url");

http.globalAgent.maxSockets = Infinity;

var port = parseInt(process.argv[2]);

var log = [];
var listeners = [];

http.createServer(function(req, res) {
  var uri = url.parse(req.url).pathname;
  if (uri.match(/get/)) {
    var slot = parseInt(req.headers['slot']);
    if (slot < log.length) {
      res.write(log[slot]);
      res.end();
    } else {
      listeners.push(res);
    }
  } else if (uri.match(/put/)) {
    var data = "";
    req.on("data", function(chunk) {
      data += chunk;
    });
    req.on("end", function() {
      listeners.forEach(function(waitingRes) {
        waitingRes.write(data);
        waitingRes.end();
      });
      listeners = [];
      log.push(data);
    });
    res.end();
  } else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
  }
}).listen(port);
