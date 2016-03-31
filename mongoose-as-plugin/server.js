const Hapi = require('hapi');

const server = new Hapi.Server();
const config = require('./config');
const connection = {
  port: config.server.port,
  host: config.server.host 
};

server.connection(connection);

const plugins = [
  { register: require('./db/mongoose.plugin'), options: { database: config.database } },
  { register: require('./user/user.plugin') }
];

server.register(plugins, (err) => {
  if (err) return reject(err);
  server.start(function (err) {
    if (err) return console.log(err.stack);
    console.log('Server started ', server.info.uri);
  });
});