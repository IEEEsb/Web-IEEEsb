const services = require("../utils/services.js"),
config = services.config,
mongoose = require('mongoose'),
User = mongoose.model('UserModel'),
Item = mongoose.model('ItemModel'),
Lock = require('../utils/lock'),
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

exports.getItem = function (req, res, next) {

	Item.findById(req.params.id, function (err, doc) {

		if (err)
		return next(new CodedError(err, 500));
		return res.send(doc);
	});
};

exports.saveItem = function (req, res, next) {

	let item = {};
	let id = req.body._id && req.body._id !== "" ? req.body._id : new mongoose.Types.ObjectId;
	if (req.body.name) {
		item.name = req.body.name;
	}
	item.location = req.body.location ? req.body.location : { main: '', sub: '' };
	item.goodState = req.body.goodState ? req.body.goodState : true;
	item.type = req.body.type ? req.body.type : 'consumable';
	item.borrowed = req.body.borrowed ? req.body.borrowed : 0;
	item.buyPrice = req.body.buyPrice ? req.body.buyPrice : 0;
	item.sellPrice = req.body.sellPrice ? req.body.sellPrice : 0;
	item.quantity = req.body.quantity ? req.body.quantity : 0;
	item.icon = req.body.icon ? req.body.icon : '';
	item.files = req.body.files ? req.body.files : [];

	Item.distinct('code', function (err, result) {
		if (err) return handleError(err);

		if (req.body.code) {
			item.code = req.body.code;
		} else {
			if(result.length === 0){
				item.code = 0;
			} else {
				result.sort(function(a, b) {
					return a - b;
				});
				item.code = 0;
				for (var i = 0; i < result.length; i++) {
					if(item.code < result[i]){
						break;
					}
					item.code = result[i] + 1;
				}
			}
		}

		Item.findOneAndUpdate({ _id: id }, item, {upsert:true, new: true, setDefaultsOnInsert: true}, function (err, item) {

			if (err){
				return next(new CodedError(err, 500));
			}
			return res.send(item);
		});
	});
};

exports.buyItem = function (req, res, next) {

	console.log(req.body);
	let itemProm = Item.findById(req.body.item).exec();
	let userProm = User.findById(req.session.user._id).exec();
	//let userProm = User.findById('58a0270f2a5a0e7725c8b4bb').exec();
	let lock = Lock('buyLock', {timeout: 1000, pollInterval: 100});
	lock.pollAcquire (function(err, lockAcquired) {

		if (err) {
			return next(new CodedError(err, 500));
		}

		if ( lockAcquired ) {
			Promise.all([itemProm, userProm]).then(values => {
				let item = values[0];
				let user = values[1];
				let quantity = req.body.quantity;

				if(item && user) {
					if(item.quantity >= quantity && quantity * item.sellPrice <= user.money ){
						itemProm = Item.findByIdAndUpdate(item._id, {$inc:{quantity: -quantity}}).exec();
						userProm = User.findByIdAndUpdate(user._id, {$inc: {money: -(quantity*item.sellPrice)}}).exec();
						Promise.all([itemProm, userProm]).then(function (values) {
							item = values[0];
							user = values[1];
							console.log(arguments);
							console.log(values);
							lock.release();
							res.send(item);
						});
					} else {
						lock.release();
						return next(new CodedError("Low values", 400));
					}
				} else {
					lock.release();
					return next(new CodedError("Invalid values", 400));
				}


			}).catch(reason => {
				lock.release();
				return next(new CodedError(reason, 400));
			});
		}
		else {
			// lock was not acquired
		}
	});

};