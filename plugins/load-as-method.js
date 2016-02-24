const
  Hapi = require('hapi'),
  server = new Hapi.Server()

// register connection
server.connection({
  port: process.env.PORT || 3000,
  host: 'localhost'
})

// create first plugin ( as method )
// once registered, http://localhost:3000/ will return 'hi from the plugin'
var plugin = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply('Hi from the plugin')
  })
  next()
}

// check: http://hapijs.com/api#plugins for more on attributes
plugin.attributes = { name: 'plugin1' }

// register plugin
server.register(plugin, () => {
  server.start(() => {
    console.log(`Server started at: ${server.info.uri}`)
  })
})
