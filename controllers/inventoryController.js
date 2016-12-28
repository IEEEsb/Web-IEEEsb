const services = require("../utils/services.js"),
    config = services.config,
    mongoose = require('mongoose'),
    Item = mongoose.model('ItemModel'),
    CodedError = require('../utils/CodedError.js'),
    winston = require('winston');

const systemLogger = winston.loggers.get('system');

exports.getItems = function (req, res, next) {
    
    Item.find().exec().then((items) => {
        return res.status(200).send(items);
    }).catch((err) => {
        return next(err);
    });
};