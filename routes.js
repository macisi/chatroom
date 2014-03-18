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

		//render views/room.jade
		res.render('room');
	});

	room(app, io);
};