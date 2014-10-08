var CMD_SEPARATOR = "\r\n";

module.exports = function(commandLine, output, cb, socket) {
    output('221 Bye' + CMD_SEPARATOR);
    socket.end();
}