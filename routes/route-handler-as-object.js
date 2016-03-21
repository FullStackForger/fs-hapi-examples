'use strict';
const hapi = require('hapi');
const server = new hapi.Server();
const connection = {
    port: 3000,
    host: 'localhost'
};

server.connection(connection);

function defaultHandler (route, options) {
    let response = {};

    // route - the route public interface object,
    // docs: http://hapijs.com/api#route-public-interface
    response.route = {
        fingerprint: route.fingerprint,
        method: route.method,
        path: route.path,
        settings: '[object]', // docs: http://hapijs.com/api#route-options
        realm: '[object]', // docs: http://hapijs.com/api#serverrealm',
        vhost: route.vhost
    };

    // options - the configuration object provided in the handler config
    response.options = options;

    // registered handler method
    return function (request, reply) {
        return reply(response);
    };
}

// Optionally handler method can have defaults object used as a default route config
// Example: Change the default payload processing for this handler
defaultHandler.defaults = {
    payload: {
        output: 'stream',
        parse: false
    }
};

// Registers a new handler type to be used in routes
// docs: http://hapijs.com/api#serverhandlername-method
server.handler('default-handler', defaultHandler);

const route = {
    method: 'GET',
    path: '/{any*}',
    // handler: object with a single key using the name of a registered handler type and value
    // with the options passed to the registered handler.
    // docs: http://hapijs.com/api#route-configuration   section: handler
    handler: {
        'default-handler': { msg: 'test message' }
    }
};

server.route(route);
server.start((err) => {
    if (err) throw err;
    console.log(`hapi server started on ${server.info.uri}`);
});

