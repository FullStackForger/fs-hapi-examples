'use strict';
const routes = require('./user.routes.js');

exports.register = function (server, options, next) {
	server.route(routes.endpoints);
	return next();
};

exports.register.attributes = {
	name: 'user'
};