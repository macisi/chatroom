/**
 * [socket logic config]
 */
var util = require('util');
var events = require('events'); 

function Room(){
	events.EventEmitter.call(this);
	this.members = {};
}
util.inherits(Room, events.EventEmitter);

Room.prototype.init = function(app, io){

	var _this = this;


	var chat = io.of('/chat').on('connection', function(socket){

		_this.on('getNewMember', function(data){

			// if (this.members.indexOf(data.username) === -1) {
			// 	//new member

			// } else {
			// 	//already in rooms
			// 	this.emit('error', {
			// 		errorText: 'sorry, this man already in the room'
			// 	});
			// }
			console.log(data);
			chat.in(this.room).emit('newMember', data);

		});

		socket.on('login', function(data){
			if (!data) return;

			//socket.room is used to distinguish rooms
			socket.room = data.id;
			socket.join(data.id);

			socket.in(socket.room).emit('startChat', {
				id: data.id
			});
		});

		socket.emit('ready', {
			data: "I'm ready!"
		});

		socket.on('message', function(data){
			/**
			 * ****** notice ********
			 * difference between socket.broadcast.to(this.room) & chat.in(this.room)
			 * - socket.broadcast.to(this.room): send the data to all the clients connected to the room except the sender
			 * - chat.in(this.room): send the data to all the clients connected to the room
			 */
			chat.in(this.room).send(data);
			// socket.broadcast.to(this.room).send(data);
		});

		//leave the chat room
		socket.on('disconnect', function(){

			socket.broadcast.to(this.room).emit('leave', {
				room: this.room
			});

			socket.leave(socket.room);
			socket.removeListener('getNewMember');
		});

	});
};
Room.prototype.addMember = function(data){
	this.emit('getNewMember', data);
};

var room = new Room();

module.exports = room;