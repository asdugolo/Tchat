var http = require('http');
var md5 = require('MD5');

httpServer = http.createServer(function(req, res){
	var url = '.' + req.url;
	/**
	* CSS/JS
	**/
	if(/\.(css|js)$/.test(url)){
		var ext = path.extname(url);
		fs.readFile(url, function(error, content) {
	        if (error) {
	            res.writeHead(404 );
	            res.end();
	        }
	        else {
				res.writeHead(200, {'Content-Type': 'text/' + (ext == '.js' ? 'javascript' : 'css') });
	            res.end(content, 'utf-8');
	        }
	    });
	}else if(/\.(jpg|png)$/.test(url)){
		var ext = path.extname(url);
		if(ext == 'jpg') ext = 'jpeg'
		fs.readFile(url, function(error, content) {
	        if (error) {
	            res.writeHead(404 );
	            res.end();
	        }
	        else {
				res.writeHead(200, {'Content-Type': 'image/' + ext });
	            res.end(content);
	        }
	    });
	}else{
		fs.readFile('./index.html', function(error, content) {
	        if (error) {
	            res.writeHead(404 );
	            res.end();
	        }
	        else {
	            res.writeHead(200, { 'Content-Type': 'text/html' });
	            res.end(content, 'utf-8');
	        }
	    });
	}

});

var ipaddr = process.env.OPENSHIFT_NODE_JS || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 1337;
	
httpServer.listen(port, ipaddr);



var io = require ('socket.io').listen(httpServer);
var users = {};
var messages = [];
var history = 2;

io.sockets.on('connection', function(socket){

	var me;
	console.log('Nouveau utilisateur');

	for(var k in users){
		socket.emit('newusr', users[k]);
	}
	for(var k in messages){
		socket.emit('newmsg', messages[k]);
	}


	/**
	* On a reçu un message
	**/

	socket.on('newmsg', function(message){
		message.user = me
		date = new Date();
		message.h = date.getHours();
		message.m = date.getMinutes();
		messages.push(message);
		if(messages.length > history){
			messages.shift();
		}
		io.sockets.emit('newmsg', message);
	});


	/**
	* Je me connecte
	**/

	socket.on('login', function(user){
		me = user;
		me.id = user.mail.replace('@','-').replace('.','-');
		me.avatar = 'https://gravatar.com/avatar/' + md5(user.mail) + '?s=50';
		socket.emit('logged');
		users[me.id] = me;
		io.sockets.emit('newusr', me);

	});


	/**
	* Je quitte le tchat
	**/

	socket.on('disconnect', function(){
		if(!me){
			return false;
		}
		delete users[me.id];
		io.sockets.emit('disusr', me);
	});

});