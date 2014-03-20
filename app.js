/**
 * use 'node app.js' to run this app
 */
var express = require('express');
var app = express();

app.use(express.bodyParser());

var server = require('http').createServer(app);
var port = isNaN(process.argv[2]) ? 8080: process.argv[2];

var io = require('socket.io').listen(app.listen(port));
io.configure('production', function(){
  // io.set('browser client', false);
});

require('./config')(app, io);
require('./routes')(app, io);

console.log('chatroom is running on http://localhost:' + port);
