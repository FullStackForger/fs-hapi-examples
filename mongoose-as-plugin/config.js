'use strict';
module.exports = {
  server: {
    host: 'localhost',
    port: 8080
  },
  database: {
  	host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    db: process.env.MONGO_DB || 'test-hapi-mongoose-plugin',
    username: process.env.MONGO_HOST || '',
    password: process.env.MONGO_HOST || ''
  }
};
