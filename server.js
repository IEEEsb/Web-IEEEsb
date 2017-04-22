var express = require("express"),
cookieParser = require('cookie-parser'),
app = express(),
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

	services.fileUtils.listFiles('./routes').then((routes) => {
		routes.forEach((route) => {
			app.use(config.mountPoint + '/api/' + route.replace('.js', ''), require('./routes/' + route));
		});

		return services.fileUtils.listFiles(config.uploadedBase);
	}).then((dirs) => {
		dirs.forEach((dir) => {
			app.get(config.mountPoint + '/' + dir + '/:file', (req, res, next) => {
				var location = __dirname + '/' + config.uploadedBase + '/' + dir + '/' + req.params.file;
				services.fileUtils.access(location).then(() => {
					return res.sendFile(location);
				}, (err) => {
					return next(new CodedError("Not found", 404));
				});
			});
		});
	}).then(()=>{
		app.use(config.mountPoint + "/", express.static(__dirname + "/frontend/dist", {fallthrough: false}));

		app.use(function (err, req, res, next) {
			if (!(err && err.code === "ENOENT" && !(/\/(\w+\.)+[a-zA-Z]+$/g.test(req.path))))
			return next(err);
			res.sendFile('frontend/dist/index.html', { "root": __dirname });
		});

		var resultController = require('./controllers/resultController.js');

		app.use(resultController.genericErrorHandler);

		app.listen(services.config.port, () => {
			systemLogger.info(services.config.serverName + " worker running");
		});
	});

	//copy();
}, (err) => {
	console.error(err.message);
	process.exit(-1);
});


