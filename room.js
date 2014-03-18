/**
 * [socket logic config]
 */

module.exports = function(app, io){

	var chat = io.of('/chat').on('connection', function(socket){

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
		});

		// console.log(socket, rooms);
		// 
	});

};