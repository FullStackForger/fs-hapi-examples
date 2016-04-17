const Hapi = require('hapi');
const server = new Hapi.Server();

// register connection
server.connection({
	port: process.env.PORT || 3000,
	host: 'localhost'
});

// create a plugin registering same route
var plugin = {
	register: function (server, options, next) {
		// register plugin route
		server.route({
			method: 'GET',
			path: '/',
			handler: (request, reply) => reply({
				status: 'ok',
				path: request.connection.info.protocol +
				'://' + request.info.host + request.url.path,
				options: options
			})
		});
		next()
	}
};
plugin.register.attributes = { name: 'plugin with options' };

// register plugin
server.register({
	register: plugin,
	options: { arbitraryOptions : { enabled: true }}
}, startServer);

function startServer(err) {
	if (err) throw err;

	//---------
	// once server is started
	// http://localhost:3000/plugin/status will return
	//  > {"status":"ok","path":"http://localhost:3000/plugin/status"}
	//---------
	server.start(() => {
		console.log(`Server started at: ${server.info.uri}`)
	})
}
