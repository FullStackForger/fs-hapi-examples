const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({port: 3000, host: 'localhost'});
server.route({
	method: 'GET',
	path: '/{path*}',
	// Bellow handler will trigger Internal Server Error (500).
	// It can not be parsed properly as request contains circular dependency.
	handler: (request, reply) => reply({
		path: request.path,
		query: request.query
	})
});

// Uses server extensions to print some information about the incoming request for debugging purposes
// http://hapijs.com/api#serverextevent-method-options
// http://hapijs.com/api#request-lifecycle
server.ext('onRequest', function (request, reply) {

	// request supports own events http://hapijs.com/api#request-events
	console.log(request.path, request.query);
	return reply.continue();
});

server.start((err) => {
	if (err) throw err;
	console.log(`hapi server started on ${server.info.uri}`);
});