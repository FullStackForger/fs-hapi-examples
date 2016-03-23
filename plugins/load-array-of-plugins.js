const Hapi = require('hapi');
const server = new Hapi.Server();

// register connection
server.connection({
  port: process.env.PORT || 3000,
  host: 'localhost'
});

// create first plugin
// once registered, http://localhost:3000/plugin1 will return 'hi from the plugin 1'
var plugin1 = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/plugin1',
      handler: (request, reply) => reply('Hi from the plugin 1')
    });
    next();
  }
};
// check: http://hapijs.com/api#plugins for more on attributes
plugin1.register.attributes = { name: 'plugin1' };


// create first plugin
// once registered, http://localhost:3000/plugin2 will return 'hi from the plugin 2'
var plugin2 = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/plugin2',
      handler: (request, reply) => reply('Hi from the plugin 2')
    });
    next()
  }
};
// check: http://hapijs.com/api#plugins for more on attributes
plugin2.register.attributes = { name: 'plugin2' };

// register array of plugins
server.register([plugin1, plugin2], () => {
  server.start(() => {
    console.log(`Server started at: ${server.info.uri}`)
  })
});
