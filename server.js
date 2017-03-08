var express = require("express"),
cookieParser = require('cookie-parser'),
app = express(),
bodyParser = require("body-parser"),
services = require("./utils/services.js"),
winston = require('winston');

services.init().then(() => {

	var systemLogger = winston.loggers.get('system');

	services.fileUtils.ensureExists('./logs').then((err) => {
		if (err)
		systemLogger.error(err.message)
	});

	let router = express.Router();

	app.use(cookieParser());

	app.use(bodyParser.json({limit: '50mb'}));

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

	var users = require('./routes/users.js');
	router.use("/api/users", users);

	var media = require('./routes/media.js');
	router.use("/api/media", media);

	var inventory = require('./routes/inventory.js');
	router.use("/api/inventory", inventory);

	var content = require('./routes/content.js');
	router.use("/api/post", content);

	router.use('/media', express.static( __dirname + "/uploaded/media", {fallthrough: false}));
	router.use('/users', express.static( __dirname + "/uploaded/users", {fallthrough: false}));
	router.use(express.static(__dirname + "/frontend/dist", {fallthrough: false}));

	app.use(services.config.mountPoint, router);
	app.use(function (err, req, res, next) {
		if (!(err && err.code === "ENOENT" && !(/\/(\w+\.)+[a-zA-Z]+$/g.test(req.path))))
		return next(err);
		res.sendFile('frontend/dist/index.html', {"root": __dirname});
	});

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


