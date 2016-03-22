'use strict';
const hapi = require('hapi');
const server = new hapi.Server();

const routes = [
    { method: 'GET', path: '/a', handler: defaultHandler },
    { method: 'GET', path: '/b', handler: defaultHandler }
];

const connection = {
    port: 3000,
    host: 'localhost'
};

server.connection(connection);
server.route(routes);
server.start(startHandler);

function defaultHandler (request, reply) {
    reply({
        request: {
            method: request.method,
            info: request.info,
            path: request.path,
            query: request.query,
            params: request.params
        },
        url: request.connection.info.protocol + '://' + request.info.host + request.url.path
    });
}

function startHandler (err) {
    if (err) throw err;
    console.log(`hapi server started on ${server.info.uri}`);
}
