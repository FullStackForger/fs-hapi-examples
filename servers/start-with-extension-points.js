'use strict'
const hapi = require('hapi');
const server = new hapi.Server();

server.connection({
	port: 3000,
	host: 'localhost'
});

// Extension Event registration
// ---------------------------------------------------
// Change all requests to '/test'
// Official docs
// > http://hapijs.com/api#serverextevents
// > http://hapijs.com/api#serverextevent-method-options
// Lifecycle of a request graph:
// > https://blog.risingstack.com/getting-started-with-hapi-8/
server.ext('onRequest', (request, reply) => {
	request.setUrl('/test');
	return reply.continue();
});

server.route({
	method: 'GET',
	path: '/test',
	handler: (request, reply) => reply('Hello world from test!')
});

server.start(function (err) {
	if (err) throw err;
	console.log(`hapi server started on ${server.info.uri}`);
});
