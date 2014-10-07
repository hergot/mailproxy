"use strict";

var net = require('net');

net.createServer(function(socket) {
    socket.write('Welcome');
    socket.remoteAddress;
    socket.remotePort;
    socket.on('data', function() {});
    socket.on('end', function() {});
}).listen(5000);