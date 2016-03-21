'use strict'
const
  hapi = require('hapi'),
  port = 3000,
  server = new hapi.Server()

// add first connection
server.connection({
  host: 'localhost',
  port: process.env.PORT || port
})

// add second connection
server.connection({
  host: 'localhost',
  port: process.env.PORT + 1 || port + 1
})

server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => {
    // check stackoverflow answer for building full URL
    // http://stackoverflow.com/a/31841704
    let url = request.connection.info.protocol + '://' + request.info.host
    reply(`Hell world from ${url}`)
  }
})

// Start the server
server.start(function () {
  // Log to the console the host and port info of each connection
  server.connections.forEach((connection) => {
    console.log(`Server started at: ${connection.info.uri}`)
  })
})
