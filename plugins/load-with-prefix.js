const
  Hapi = require('hapi'),
  server = new Hapi.Server()

// register connection
server.connection({
  port: process.env.PORT || 3000,
  host: 'localhost'
})

// create route object
const route = {
  method: 'GET',
  path: '/status',
  handler: (request, reply) => reply({
    status: 'ok',
    path: request.connection.info.protocol +
      '://' + request.info.host + request.url.path
  })
}

// register route
server.route(route)

// create a plugin registering same route
var plugin = {
  register: function (server, options, next) {
    server.route(route)
    next()
  }
}
plugin.register.attributes = { name: 'plugin' }

// register plugin
server.register(plugin, {
    // prefix all plugin routes
    routes: { prefix: '/plugin'}
  }, () => {

  //---------
  // once server is started
  // http://localhost:3000/plugin/status will return
  //  > {"status":"ok","path":"http://localhost:3000/plugin/status"}
  // and http://localhost:3000/status will return
  // > {"status":"ok","path":"http://localhost:3000/status"}
  //---------
  server.start(() => {
    console.log(`Server started at: ${server.info.uri}`)
  })
})
