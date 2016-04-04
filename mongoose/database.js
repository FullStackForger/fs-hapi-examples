const Mongoose = require('mongoose');
const config = require('./config');

exports.connect = function () {
	return new Promise((resolve, reject) => {
		Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);
		Mongoose.connection.on('error', (error) => {
			console.log('mongo connection error');
			reject(error);
		});
		Mongoose.connection.once('open', () => {
			console.log('mongo connection established');
			resolve();
		});
		Mongoose.connection.once('disconnected', () => {
			Mongoose.connection.removeAllListeners('error');
		});
	});
};
