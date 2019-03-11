const Post = require('../models/Post');

const {
	UnknownObjectError,
} = require('../common/errors');

module.exports.getPost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postId).populate('author', 'name');
		if (!post) throw new UnknownObjectError('Post');

		return res.status(200).send({ post });
	} catch (e) {
		return next(e);
	}
};

module.exports.getPosts = async (req, res, next) => {
	try {
		const posts = await Post.find({ }).sort('-creationDate').populate('author', '_id name');

		return res.status(200).send({ posts });
	} catch (e) {
		return next(e);
	}
};

module.exports.getPublishedPost = async (req, res, next) => {
	try {
		const post = await Post.findOne({ _id: req.params.postId, published: true }).populate('author', '_id name');

		return res.status(200).send({ post });
	} catch (e) {
		return next(e);
	}
};

module.exports.getPublishedPosts = async (req, res, next) => {
	try {
		const posts = await Post.find({ published: true }).sort('-creationDate').populate('author', '_id name');

		return res.status(200).send({ posts });
	} catch (e) {
		return next(e);
	}
};

module.exports.addPost = async (req, res, next) => {
	try {
		req.body.author = req.session.userId;
		const post = await Post.create(req.body);

		return res.status(200).send({ post });
	} catch (e) {
		return next(e);
	}
};

module.exports.updatePost = async (req, res, next) => {
	try {
		req.body.modifiedDate = Date.now();
		const post = await Post.findOneAndUpdate({ _id: req.params.postId }, { $set: req.body }, { new: true }).populate('author', '_id name');
		if (!post) throw new UnknownObjectError('Post');

		// logger.logUpdate(req.session.user._id, item._id, !!req.body.reset);
		return res.status(200).send({ post });
	} catch (e) {
		return next(e);
	}
};

module.exports.removePost = async (req, res, next) => {
	try {
		await Post.findOneAndRemove({ _id: req.params.postId });

		return res.sendStatus(204);
	} catch (e) {
		return next(e);
	}
};

module.exports.publishPost = async (req, res, next) => {
	try {
		const post = await Post.findOneAndUpdate({ _id: req.params.postId, published: false }, { $set: { published: true } }, { new: true }).populate('author', '_id name');
		if (!post) throw new UnknownObjectError('Post');

		return res.status(200).send({ post });
	} catch (e) {
		return next(e);
	}
};
