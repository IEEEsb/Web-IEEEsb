const services = require("../utils/services.js"),
config = require('../utils/services.js').config,
mongoose = require('mongoose'),
Media = mongoose.model('MediaModel'),
CodedError = require('../utils/CodedError.js'),
Promise = require('bluebird'),
winston = require('winston'),
multer = require('multer'),
fs = require('fs');

const systemLogger = winston.loggers.get("system");
const sessionLogger = winston.loggers.get("session");

const storagePath = config.uploadedBase + '/media';

exports.getMedia = function (req, res, next) {

	Media.find().exec().then((items) => {
		return res.status(200).send(items);
	}).catch((err) => {
		return next(err);
	});
}

exports.uploadMedia = function (req, res, next) {
	let uploadedMedia;
	let storage = multer.diskStorage({
		destination: function (req, file, cb) {
			services.fileUtils.ensureExists(storagePath).then(() => {
				cb(null, storagePath);
			});
		},
		filename: function (req, file, cb){
			let media = new Media({
				name: file.originalname,
				createdOn: Date.now(),
				mimeType: file.mimetype
			});
			media.save().then(function(err) {
				uploadedMedia = media;
				cb(null, media._id.toString());
			});
		}
	});
	let upload = multer({ storage: storage }).any();
	upload(req, res, function (err) {
		if (err) {
			return next(new CodedError(err.message, 403));
		}

		return res.status(200).send(uploadedMedia);
	});
};

exports.removeMedia = function (req, res, next) {

	Media.findById(req.params.id, function(err, file) {
		if (err){
			return next(new CodedError(err, 403));
		}
		Media.remove({_id: req.params.id}, function (err) {
			fs.unlink(storagePath + "/" + file._id, function (err) {
				if (err){
					return next(new CodedError(err, 500));
				}
				res.status(200).send(true);
			});
		});

	});
}