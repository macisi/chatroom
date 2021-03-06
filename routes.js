/**
 * URL patterns:
 * - /
 * - /room/:id
 */
var room = require('./room');

module.exports = function(app, io){

	app.get('/', function(req, res){

		// render views/home.jade
		res.render('home');
	});

	app.get('/room/:id', function(req, res){

		var id = req.params.id;
		//render views/room.jade
		res.render('room', {
			id: id
		});

	});

	app.post('/user', function(req, res){
		//todo
		res.send({
			success: true
		});
		res.send(200);

		room.addMember(req.body);
	});

	room.init(app, io);
};