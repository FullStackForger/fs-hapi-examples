'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();

// register connection
server.connection({ port: 8001, host: 'localhost', labels: ['server.no.1'] });
server.connection({ port: 8002, host: 'localhost', labels: ['server.no.2'] });

// create a plugin registering same route
const plugin = {
	register: function (server, options, next) {
		// register plugin route
		server.route({
			method: 'GET',
			path: '/',
			handler: (request, reply) => reply({
				status: 'ok',
				path: request.connection.info.protocol +
				'://' + request.info.host + request.url.path,
				options: reply.realm.pluginOptions
			})
		});
		next();
	}
};
plugin.register.attributes = { name: 'plugin with options' };


// register plugin
const registrations = [
	{ register: plugin,	options: { foo : 'plugin 1 bar'}, select: ['server.no.1'] },
	{ register: plugin,	options: { foo : 'plugin 2 bar'}, select: ['server.no.2'] }
];
server.register(registrations,	startServer);

function startServer(err) {
	if (err) throw err;

	//---------
	// once server is started
	// http://localhost:8001/ will return { ..., options: { foo: 'plugin 1 bar' } }
	// and
	// http://localhost:8001/ will return { ..., options: { foo: 'plugin 1 bar' } }
	//---------
	server.start(() => {
		server.connections.forEach((connection) => {
			console.log(`Server started at: ${connection.info.uri}`);
		});
	})
}
