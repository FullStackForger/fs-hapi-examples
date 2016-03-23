'use strict';
const User    = require('./user.controller.js');

exports.endpoints = [
	{ path: '/', method: 'GET', handler: (req, rep) => rep({status: 'ok'}) },
  { path: '/user', method: 'GET', config: User.getAll },
  { path: '/user', method: 'POST', config: User.create },
  { path: '/user', method: 'DELETE', config: User.removeAll },
  { path: '/user/{userId}', method: 'GET', config: User.getOne },
  { path: '/user/{userId}', method: 'PUT', config: User.update },
  { path: '/user/{userId}', method: 'DELETE', config: User.remove }
];