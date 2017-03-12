var express = require("express"),
cookieParser = require('cookie-parser'),
app = express(),
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
			services.inventoryLogger.setUser(user);
			next();
		});
	}

    services.fileUtils.listFiles('./routes').then((routes) => {
        routes.forEach((route) => {
            app.use(config.mountPoint + '/api/' + route.replace('.js', ''), require('./routes/' + route));
        });
    });

    app.get(config.mountPoint + '/files/*', (req, res, next) => { //for media and users
        var location = app.path.resolve(config.uploadedBase + req.url.replace('files/', ''));
		services.fileUtils.access(location).then(() => {
            return res.sendFile(location);
        }, (err) => {
            return next(new CodedError("Not found", 404));
        });
    });

    /*app.use(function (err, req, res, next) {
        if (!(err && err.code === "ENOENT" && !(/\/(\w+\.)+[a-zA-Z]+$/g.test(req.path))))
            return next(err);
        res.sendFile('frontend/dist/index.html', { "root": __dirname });
    });*/

    app.use(config.mountPoint + "/", express.static(__dirname + "/frontend/dist"));

	/*app.use(/(?!\/api)\/.*$/i, (req, res, next) => {
		console.log(req.path);
		return res.sendFile('frontend/dist/index.html', { "root": __dirname });
	});*/

	var resultController = require('./controllers/resultController.js');

	app.use(resultController.genericErrorHandler);

	app.listen(services.config.port, () => {
		systemLogger.info(services.config.serverName + " worker running");
	});

	//copy();
}, (err) => {
	console.error(err.message);
	process.exit(-1);
});


