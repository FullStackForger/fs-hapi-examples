const
  Hapi = require('hapi'),
  server = new Hapi.Server()

// register connections
server.connection({ port: 3000, labels: 'a' });
server.connection({ port: 3001, labels: 'b' });
server.connection({ port: 3002, labels: 'c' });

// create first plugin
var plugin1 = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/plugin1',
    handler: (request, reply) => reply('Hi from plugin 1')
  })
  next()
}
plugin1.attributes = { name: 'plugin1' };

// create second plugin
var plugin2 = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/plugin2',
    handler: (request, reply) => reply('Hi from plugin 2')
  })
  next()
}
plugin2.attributes = { name: 'plugin2' };

// register plugin 1
// -----------------
// plugin 1 will respond to:
// http://localhost:3000/plugin1
// http://localhost:3001/plugin1
server.register(plugin1, function (err) {
  if (err) throw err

  // register plugin 2
  // -----------------
  // it will respond only to:
  // http://localhost:3000/plugin2
  server.register(plugin2, { select : ['a'] }, function (err) {
    if (err) throw err

    server.start(function () {
      // Log to the console the host and port info of each connection
      server.connections.forEach((connection) => {
        console.log(`Server started at: ${connection.info.uri}`)
      })
    })
  })
})
