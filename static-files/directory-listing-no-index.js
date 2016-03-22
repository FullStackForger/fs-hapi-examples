const Hapi = require('hapi');
const Inert = require('inert');
const server = new Hapi.Server();
const connection = {
    host: 'localhost',
    port: 3000
};

server.register(Inert, () => {});
server.connection(connection);
server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: {
            index: false,    // default set to: 'index.html'
            //showHidden: false,      // default set to: false
            path: 'public',
            listing: true
        }
    }
});

server.start((err) => {
    if (err) throw err;
    console.log(`hapi server started on ${server.info.uri}`);
});