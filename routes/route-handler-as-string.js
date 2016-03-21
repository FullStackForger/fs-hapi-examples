'use strict';
const hapi = require('hapi');
const server = new hapi.Server();
const connection = {
    port: 3000,
    host: 'localhost'
};

server.connection(connection);

// registered handler method
return function serverMethod (request, reply) {
    return reply({ success: true });
};

// Registers a server method that then can be used throughout the application as a common utility. 
// They can be configured to use the built-in cache and share across multiple request handlers 
// without having to create a common module.
// docs: http://hapijs.com/api#servermethodname-method-options
erver.method('handler.serverMethod', method);

const route = {
    method: 'GET',
    path: '/{any*}',
    // If handler is set to a string, the value is parsed the same way
    // a prerequisite server method string shortcut is processed.
    // docs: http://hapijs.com/api#route-configuration   section: handler
    handler: 'handler.serverMethod'
};

server.route(route);
server.start((err) => {
    if (err) throw err;
    console.log(`hapi server started on ${server.info.uri}`);
});

