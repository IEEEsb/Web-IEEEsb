var Promise = require('bluebird'),
    services = require('../services.js'),
    config = services.config,
    winston = require('winston'),
    mailcomposer = require('mailcomposer');

var mailgun = require('mailgun-js')({ apiKey: config.mailApiKey, domain: config.mailDomain });

const servicesLogger = winston.loggers.get('services');

servicesLogger.info("Loading email services");

exports.sendRecoverPasswordEmail = function (pilot) {
    return new Promise((resolve, reject) => {
        services.fileUtils.readFile(config.uploadedBase + '/email/welcomeEmail.html').then((data) => {
            var html = data.toString().replace("%subject%", 'Bienvenido a la LDU').replace("%recipient_email%", pilot.email).replace("%recipient_name%", pilot.name + " " + pilot.surname).replace("%recipient.callSign%", pilot.callSign);
            var mail = mailcomposer({
                from: config.mailList,
                to: pilot.email,
                subject: 'Bienvenido a la LDU',
                html: html
            });
            mail.build((mailBuildError, message) => {
                var dataToSend = {
                    to: pilot.email,
                    message: message.toString('ascii')
                };
                mailgun.messages().sendMime(dataToSend, (err, body) => {
                    if (err) return reject(err);
                    else return resolve(body);
                });
            });
        });
    });
}

exports.init = function () {
    return new Promise((resolve, reject) => {
        return resolve();
    });
};