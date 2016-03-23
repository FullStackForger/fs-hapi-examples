const Hapi = require('hapi');

const server = new Hapi.Server();
const database = require('./database');
const config = require('./config');
const connection = {
  port: config.server.port,
  host: config.server.host 
};

server.connection(connection);

const plugins = [
  require('./user/user.plugin')
];

database
  .connect()
  .then(registerUserPlugins)
  .then(startServer)
  .then((server) => {
    console.log('Server started ', server.info.uri);
  })
  .catch((err) => {
    console.log(err.stack);
  });


function registerUserPlugins () {
  return new Promise((resolve, reject) => {
    server.register(plugins, (err) => {
      if (err) return reject(err);
      resolve();
    });
  })
}

function startServer () {
  return new Promise((resolve, reject) => {
    server.start(function (err) {
      if (err) return reject(err);
      resolve(server);
    });
  })
}
