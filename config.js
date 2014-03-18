var express = require('express');

module.exports = function(app, io){

	app.set('view engine', 'jade');
	app.set('view cache', 'false');

	app.engine('jade', require('jade').__express);

	app.set('views', process.cwd() + '/views');

	app.use(express.static(process.cwd() + '/public'));

	//show all comment
	io.set('log level', 1);

};