'use strict';
const hapi = require('hapi');
const server = new hapi.Server();

const connection = {
    port: 3000,
    host: 'localhost'
};

const route = {
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply('Hello world from test!')
};

function startHandler(err) {
    if (err) throw err;
    console.log(`hapi server started on ${server.info.uri}`);
}

server.connection(connection);
server.route(route);
server.start(startHandler);
