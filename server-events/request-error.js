const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });
server.route({
    method: 'GET',
    path: '/',
    // Bellow handler will trigger Internal Server Error (500).
    // It can not be parsed properly as request contains circular dependency.
    handler: (request, reply) => reply(request)
});

// http://hapijs.com/api#server-events
// Emitted whenever an error response is sent.
server.on('request-error', (request, err) => {
    console.log('Error response (500) sent for request: ' + request.id + ' because: ' + err.message);
    console.log(err.stack);
});

server.start((err) => {
    if (err) throw err;
    console.log(`hapi server started on ${server.info.uri}`);
});