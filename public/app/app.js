var socket = io.connect(location.origin + '/chat');

var list = document.getElementById("J-chatList");
var input = document.getElementById("J-input");
var send = document.getElementById("J-send");

var pathname = window.location.pathname;
var roomId = pathname.replace('/room/', '');

socket.on('connect', function(){

	socket.emit('login', {
		id: roomId
	});

	socket.on('startChat', start);

	socket.on('ready', ready);

	socket.on('message', updateList);

	socket.on('leave', leaveRoom);

	send.addEventListener("click", sendMessage, false);

});

/**
 * [start chat]
 */
function start(data){
	console.log('startChat', data);
}

/**
 * [ready to chat]
 */
function ready(data){
	console.log('ready', data);
}

/**
 * [send message]
 */
function sendMessage(e){
	socket.send(input.value);
}

/**
 * [update chat list]
 */
function updateList(data){
	console.log('receive:', data);
	var item = document.createElement("p");
	item.innerHTML = data;
	list.appendChild(item);
}

/**
 * [others leave the chat room]
 */
function leaveRoom(data){
	console.log('leave:', data);
}