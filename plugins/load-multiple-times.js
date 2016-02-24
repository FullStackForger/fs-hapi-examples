const
  Hapi = require('hapi'),
  server = new Hapi.Server()

// register connection
server.connection({
  port: process.env.PORT || 3000,
  host: 'localhost'
})

// create first plugin ( as object )
// once registered, http://localhost:3000/ will return 'hi from the plugin'
var plugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: options.path,
      handler: (request, reply) => reply(options.message)
    })
    next()
  }
}
// check: http://hapijs.com/api#plugins for more on attributes
plugin.register.attributes = {
  name: 'plugin1',
  multiple: true    // allows to load multiple times
}

// register plugin multiple times passing along configuration options object
server.register([{
  register: plugin,
  options: {
    path: '/plugin1',
    message: 'hello from plugin 1'
  }
},{
  register: plugin,
  options: {
    path: '/plugin2',
    message: 'hello from plugin 2'
  }
}], () => {
  server.start(() => {
    console.log(`Server started at: ${server.info.uri}`)
  })
})
