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
    // handler can be a callback or an arrow
    handler: function (request, reply) {
        reply('Hello world!')
    }
};

server.connection(connection);
server.route(route);
server.start((err) => {
    if (err) throw err;
    console.log(`hapi server started on ${server.info.uri}`);
});
