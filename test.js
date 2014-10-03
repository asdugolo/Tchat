var http = require('http');
httpServer = http.createServer(function(req, res){
	res.end('Hello World')
});

httpServer.listen(1337);