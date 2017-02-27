const services = require("../utils/services.js"),
    config = services.config,
    mongoose = require('mongoose'),
    Link = mongoose.model('LinkModel'),
    Post = mongoose.model('PostModel'),
    CodedError = require('../utils/CodedError.js'),
    winston = require('winston');

const systemLogger = winston.loggers.get('system');

exports.savePost = function (req, res, next) {

    let post = {};
    let id = req.body._id && req.body._id !== "" ? req.body._id : new mongoose.Types.ObjectId;
    post.title = req.body.title ? req.body.title : "";
	post.author = req.body.author ? req.body.author : req.session.user;
    post.content = req.body.content ? req.body.content : "";
    post.excerpt = req.body.excerpt ? req.body.excerpt : "";
    post.published = req.body.published ? req.body.published : false;
    post.tags = req.body.tags ? req.body.tags : [];
    post.modifiedDate = new Date;


    Post.findOneAndUpdate({ _id: id }, { $set: post }, {upsert:true, new: true, setDefaultsOnInsert: true}, function (err, doc) {

        if (err)
            return next(new CodedError(err, 500));
        return res.send(doc);
    });
};

exports.getPost = function (req, res, next) {

    Post.findById(req.params.id).populate('author', 'alias').exec(function (err, doc) {
        if (err)
            return next(new CodedError(err, 500));
        return res.send(doc);
    });
};

exports.getPosts = function (req, res, next) {

    Post.find().populate('author', 'alias').exec(function (err, doc) {

        if (err)
            return next(new CodedError(err, 500));
        return res.send(doc);
    });
};

exports.removePost = function (req, res, next) {

    Post.remove({ _id: req.params.id }, function (err, doc) {

        if (err)
            return next(new CodedError(err, 500));
        return res.send(doc);
    });
};

exports.publishPost = function (req, res, next) {

    Post.update({ _id: req.params.id }, { $set: { published: true, publishedDate: new Date }}, function (err) {

        if (err)
            return next(new CodedError(err, 500));
        return res.send(true);
    });
};