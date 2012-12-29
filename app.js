var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello from <a href="http://appfog.com">AppFog.com</a>');
}).listen(process.env.VMC_APP_PORT || 1337, null);

var clouds = [];

var net = require('net');
net.createServer(function (socket) {
	socket.write('{"type":"message", "content":"Welcome,please authenticate"}');
	socket.on('data', function (data) {
		try {
			data = JSON.parse(data);
			if (data.type == "authentication") {
				console.log('Authentication');
				
				if (!clouds[data.key]) {
					clouds[data.key] = [];
				}

				socket.key = data.key;
				socket.write('{"type":"message", "content":"You are now registered under key '+ data.key +'"}');
			} else {
				console.log('Data within ' + socket.key);
				
			}
		} catch (ex) {
			console.log('Exception: ' + ex);
		}
	});	
}).listen(8000);
