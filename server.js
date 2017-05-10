var express = require("express"),
cookieParser = require('cookie-parser'),
app = express(),
requestLanguage = require('express-request-language'),
cookieParser = require('cookie-parser'),
CodedError = require('./utils/CodedError.js'),
bodyParser = require("body-parser"),
services = require("./utils/services.js"),
winston = require('winston');

services.init().then(() => {

	var systemLogger = winston.loggers.get('system');
	let config = services.config;

	services.fileUtils.ensureExists('./logs').then((err) => {
		if (err)
		systemLogger.error(err.message)
	});

	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ extended: true }));

	let languages = config.languages;
	app.use(cookieParser());
	app.use(requestLanguage({
		languages: languages,
		cookie: {
			name: 'language',
			options: { maxAge: 365*24*3600*1000 }
		}
	}));

	app.use(services.session.store);

	if (services.config.logLevel == "debug") {
		app.use((req, res, next) => {
			var user = {
				username: "unknown"
			};
			if (req.session && req.session.user)
			var user = req.session.user;
			var logLine = "[" + user.alias + "] " + req.originalUrl;
			systemLogger.debug(logLine);
			next();
		});
	}

	let regExpLng = languages.map((lng) => {
		return '/' + lng;
	}).join('|');
	regExpLng = '(' + regExpLng + ')?';
	services.fileUtils.listFiles('./routes').then((routes) => {
		routes.forEach((route) => {
			app.use(config.mountPoint + regExpLng + '/api/' + route.replace('.js', ''), require('./routes/' + route));
		});

		return services.fileUtils.listFiles(config.uploadedBase);
	}).then((dirs) => {
		dirs.forEach((dir) => {
			app.get(config.mountPoint + regExpLng + '/' + dir + '/:file', (req, res, next) => {
				var location = __dirname + '/' + config.uploadedBase + '/' + dir + '/' + req.params.file;
				services.fileUtils.access(location).then(() => {
					return res.sendFile(location);
				}, (err) => {
					return next(new CodedError("Not found", 404));
				});
			});
		});
	}).then(()=>{
		app.get(config.mountPoint + "/*", (req, res, next) => {
			console.log(req.language);
			let location = __dirname + "/frontend/dist/" + req.language + (req.path === '/' ? '/index.html' : req.path);
			console.log(location);
			services.fileUtils.access(location).then(() => {
				return res.sendFile(location);
			}).catch((err) => {
				return next(new CodedError("Not found", 404));
			});
		});

		var resultController = require('./controllers/resultController.js');

		app.use(resultController.genericErrorHandler);

		app.listen(services.config.port, () => {
			systemLogger.info(services.config.serverName + " worker running");
		});
	});

	//copy();
})
.catch((err) => {
	console.error(err.message);
	process.exit(-1);
});


