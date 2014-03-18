/**
 * [the global config for require]
 */
var require = {

	baseUrl: '/',

	paths: {
		'app': 'app',
		'lib': 'lib',
		'socket.io': 'socket.io/socket.io'
	},

	shim: {
		'socket.io': {
			exports: 'io'
		}
	}
};