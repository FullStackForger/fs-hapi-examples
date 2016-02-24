'use strict'
const
  hapi = require('hapi'),
  server = new hapi.Server()

// register 'web' connection
server.connection({ port: process.env.PORT || 3000, labels: 'web' })
// register 'api' connection
server.connection({ port: process.env.PORT + 1 || 3001, labels: 'api' })

// select server connections
const api = server.select('api')
const web = server.select('web')

// apply different status route to web server
// http://localhost:3000/status will return HTML content
web.route({
	method: 'GET',
	path: '/status',
	handler: (request, reply) => reply('<h3>Status: OK</h3>')
})

// apply status route to api server
// http://localhost:3001/status will return JSON content
api.route({
	method: 'GET',
	path: '/status',
	handler: (request, reply) => reply({status: 'ok'}) // returns JSON
})

server.start(function (err) {
	if (err) throw err
  server.connections.forEach((connection) => {
    console.log(`Server started at: ${connection.info.uri}`)
  })
})
