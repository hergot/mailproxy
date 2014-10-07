"use strict";

var net = require('net');
var argv = require('minimist')(process.argv.slice(2));
var port = argv['p'] || 5000;

process.stdout.write('Starting at port ' + port + "\n");

net.createServer(function(socket) {
    socket.write('Welcome');
    socket.remoteAddress;
    socket.remotePort;
    socket.on('data', function() {});
    socket.on('end', function() {});
}).listen(port);