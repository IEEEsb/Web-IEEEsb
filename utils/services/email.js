var Promise = require('bluebird'),
services = require('../services.js'),
config = services.config,
winston = require('winston'),
mailcomposer = require('mailcomposer');

var mailgun = require('mailgun-js')({ apiKey: config.mailApiKey, domain: config.mailDomain });

const servicesLogger = winston.loggers.get('services');

servicesLogger.info("Loading email services");

exports.sendRecoverPasswordEmail = function (user, password) {
	return new Promise((resolve, reject) => {

		var data = {
			from: 'IEEEsb Madrid <info@ieeesb.es>',
			to: user.email,
			subject: 'Password recovery',
			html: '<p style="font-size: 12px; margin-left: 20px; line-height: 60%;">' + password + "</p>"
		};

		mailgun.messages().send(data, function (err, body) {
			console.log(body);
			if (err) return reject(err);
			else return resolve(body);
		});
	});
}

exports.init = function () {
	return new Promise((resolve, reject) => {
		return resolve();
	});
};