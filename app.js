/**
 * use 'node app.js' to run this app
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 8080;

var io = require('socket.io').listen(app.listen(port));
io.configure('production', function(){
  // io.set('browser client', false);
});

require('./config')(app, io);
require('./routes')(app, io);

console.log('chatroom is running on http://localhost:' + port);
