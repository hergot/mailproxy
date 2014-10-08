"use strict";

var net = require('net');
var os = require("os");
var argv = require('minimist')(process.argv.slice(2));
var port = argv['p'] || 5000;
var CMD_SEPARATOR = "\r\n";
var SUPPORTED_COMMANDS = ['HELO', 'EHLO', 'MAIL', 'RCPT', 'DATA', 'RSET', 'NOOP', 'QUIT', 'VRFY'];

process.stdout.write('Starting at port ' + port + "\n");

net.createServer(function(socket) {
    var queue = [];
    socket.write('220 ' + os.hostname() + ' ESMTP MailProxy' + "\n");
    socket.remoteAddress;
    socket.remotePort;
    socket.on('data', function(data) {
        if (queue.length > 0) {
            var processor = queue.shift();
            processor(data, function(text) {
                    socket.write(text);
                }, function(cb) {
                    if (cb) {
                        queue.push(cb);
                    }
               }, socket);
        } else {
            dispatch(data, function(text) {
                    socket.write(text);
                }, function(cb) {
                    if (cb) {
                        queue.push(cb);
                    }
                }, socket);
        }
    });
    socket.on('end', function() {
        process.stdout.write('Socket closed' + "\n");
    });
}).listen(port);

function dispatch(data, output, cb, socket) {
//    process.stdout.write('>' + String(data).replace(CMD_SEPARATOR, '') + '<' + "\n");
    var commandLine = (String(data).replace(CMD_SEPARATOR, ''));
    var command = commandLine.split(' ')[0];
    if (SUPPORTED_COMMANDS.indexOf(command.toUpperCase()) === -1) {
    // handle error - not supported command
        output('500 Syntax error, command unrecognised' + CMD_SEPARATOR);
        return;
    }
    var command = require(__dirname + '/commands/' + command.toLowerCase() + '.js');
    command(commandLine, output, cb, socket);
};

