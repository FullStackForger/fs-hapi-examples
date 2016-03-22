'use strict';
const hapi = require('hapi');
const server = new hapi.Server();

const connection = {
    port: 3000,
    host: 'localhost'
};

const route = {
    method: 'GET',
    path: '{path*}',
    handler: (request, reply) => {
        reply({
            method: request.method,
            info: request.info,
            path: request.path,
            query: request.query,
            params: request.params
        })
    }
};

function startHandler(err) {
    if (err) throw err;
    console.log(`hapi server started on ${server.info.uri}`);
}

server.connection(connection);
server.route(route);
server.start(startHandler);
