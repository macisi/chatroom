require(['socket.io'], function(io){

	var socket = io.connect(location.origin + '/chat');

	var list = document.getElementById("J-chatList");
	var input = document.getElementById("J-input");
	var send = document.getElementById("J-send");
	var submit = document.getElementById("J-submit");

	var pathname = window.location.pathname;
	var roomId = pathname.replace('/room/', '');

	var layout = {
		el: document.getElementById("J-room"),
		init: function(){

			socket.on('connect', function(){
				socket.emit('login', {
					id: roomId
				});

				socket.on('startChat', start);

				socket.on('newMember', welcomeNewer);

				socket.on('ready', ready);

				socket.on('message', updateList);

				socket.on('leave', leaveRoom);

				submit.addEventListener("click", function(e){
					setUserInfo('username=Mike');
				}, false);
			});
		}
	};

	layout.init();

	
	/**
	 * [send userinfo]
	 * @param {[type]} data [userinfo]
	 */
	function setUserInfo(data){
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4 && xhr.status === 200) {
				var res = JSON.parse(xhr.responseText);
				if (res.success) {
					beginChat();
				}
			}
		};

		xhr.open('post', '/user', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(data);
	}

	/**
	 * [when someone join in room, show welcome him]
	 */
	function welcomeNewer(data){
		console.log(data);
	}

	/**
	 * [after set up user's info, start chatting]
	 */
	function beginChat(){
		
		send.addEventListener("click", sendMessage, false);
		input.addEventListener("keypress", sendMessage, false);
	}

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
		//click send button or press enter on textarea
		if (e.target === send || (e.target === input && e.keyCode === 13)) {
			socket.send(input.value);
			input.value = "";
		}
	}

	/**
	 * [update chat list]
	 */
	function updateList(data){
		console.log('receive:', data);
		var item = document.createElement("p");
		item.innerHTML = data;
		list.appendChild(item);
		list.scrollTop = list.scrollHeight - list.offsetHeight;
	}

	/**
	 * [others leave the chat room]
	 */
	function leaveRoom(data){
		console.log('leave:', data);
	}
	
});
