const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
	title: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	content: { type: String, required: true },
	excerpt: { type: String, required: true },
	published: { type: Boolean, default: false },
	creationDate: { type: Date, default: Date.now },
	modifiedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', Post);
