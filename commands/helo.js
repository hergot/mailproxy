var os = require('os');
var CMD_SEPARATOR = "\r\n";

module.exports = function(commandLine, output, cb, socket) {
    var commandParts = commandLine.split(' ');
    if (commandParts.length != 2) {
        output('501 Syntax: HELO hostname' + CMD_SEPARATOR);
    } else {
        output('250 ' + os.hostname() + CMD_SEPARATOR);
    }
}