const services = require("../utils/services.js"),
config = services.config,
logger = services.inventoryLogger,
mongoose = require('mongoose'),
User = mongoose.model('UserModel'),
Item = mongoose.model('ItemModel'),
Log = mongoose.model('LogModel'),
Session = mongoose.model('SessionModel'),
Lock = require('../utils/lock'),
CodedError = require('../utils/CodedError.js')
authController = require('./authController.js'),
winston = require('winston');

const systemLogger = winston.loggers.get('system');

function mapBasicItem(item) {
	return {
		_id: item.id,
		code: item.code,
		name: item.name,
		location: item.location,
		tags: item.tags,
		goodState: item.goodState,
		type: item.type,
		borrowed: item.borrowed,
		buyPrice: item.buyPrice,
		sellPrice: item.sellPrice,
		quantity: item.quantity,
		icon: item.icon,
		files: item.files
	}
}

function mapBasicPurchase(purchase) {
	return {
		_id: purchase.id,
		who: purchase.who,
		item: purchase.item,
		quantity: purchase.quantity
	}
}

function getBasicItem(item) {

	let formatItem = {};
	for (let key in item) {
		switch (key) {
			case "_id":
			formatItem._id = item._id;
			break;
			case "code":
			formatItem.code = item.code;
			break;
			case "name":
			formatItem.name = item.name;
			break;
			case "location":
			formatItem.location = item.location;
			break;
			case "tags":
			formatItem.tags = item.tags;
			break;
			case "goodState":
			formatItem.goodState = item.goodState;
			break;
			case "type":
			formatItem.type = item.type;
			break;
			case "borrowed":
			formatItem.borrowed = item.borrowed;
			break;
			case "buyPrice":
			formatItem.buyPrice = item.buyPrice;
			break;
			case "sellPrice":
			formatItem.sellPrice = item.sellPrice;
			break;
			case "quantity":
			formatItem.quantity = item.quantity;
			break;
			case "icon":
			formatItem.icon = item.icon;
			break;
			case "files":
			formatItem.files = item.files;
			break;

			default:

		}
	}
	return formatItem;
}



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

exports.insertItem = function (req, res, next) {

	let item = getBasicItem(req.body);

	item._id = new mongoose.Types.ObjectId;

	Item.distinct('code', function (err, result) {
		if (err) return handleError(err);

		let initial = 100000;
		if (req.body.code) {
			item.code = req.body.code;
		} else {
			if(result.length === 0){
				item.code = initial;
			} else {
				result.sort(function(a, b) {
					return a - b;
				});
				item.code = initial;
				for (var i = 0; i < result.length; i++) {
					if(item.code < result[i]){
						break;
					}
					if(result[i] + 1 > initial){
						item.code = result[i] + 1;
					}
				}
			}
		}

		Item.findOneAndUpdate({ _id: item._id }, { $set: item }, {upsert:true, new: true, setDefaultsOnInsert: true}, function (err, item) {

			if (err){
				return next(new CodedError(err, 400));
			}

			logger.logInsert(item._id);
			return res.send(mapBasicItem(item));
		});
	});
};

exports.updateItem = function (req, res, next) {

	let item = getBasicItem(req.body);
	console.log(item);
	Item.findOneAndUpdate({_id: req.body._id}, { $set: item }, { new: true }, function (err, item) {
		if (err)
		return next(new CodedError(err, 400));
		console.log(arguments);
		logger.logUpdate(item._id, req.body.reset ? true : false);
		return res.send(item);
	});
};

exports.removeItem = function (req, res, next) {

	Item.remove({_id: req.params.id}, function (err) {
		if (err)
		return next(new CodedError(err, 400));
		return res.send(true);
	});
};

exports.buyItem = function (req, res, next) {

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
						itemProm = Item.findByIdAndUpdate(item._id, {$inc:{quantity: -quantity}}, { new: true }).exec();
						userProm = User.findByIdAndUpdate(user._id, {$inc: {money: -(quantity*item.sellPrice)}}).exec();
						Promise.all([itemProm, userProm]).then(function (values) {
							item = values[0];
							user = values[1];
							lock.release();
							logger.logBuy(item._id, quantity);
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

exports.getPurchases = function (req, res, next) {

	let search = { action: 'buy' };
	if(req.params.id) {
		search['who._id'] = mongoose.Types.ObjectId(req.params.id);
	}
	Log.find(search).exec(function (err, purchases) {
		if (err)
		return next(new CodedError(err, 400));

		return res.send(purchases);
	});
};

exports.cancelPurchase = function (req, res, next) {
	console.log(req.params);
	Log.findOne({_id: req.params.id, 'options.cancelled': false}, function (err, log) {
		if (err) return next(new CodedError(err, 400));
		Promise.all([
			Log.update({_id: req.params.id}, { $set: { "options.cancelled": true } }).exec(),
			User.update({_id: req.session.user._id}, {$inc: {money: log.quantity * log.item.sellPrice}}).exec(),
			Item.update({_id: log.item._id}, {$inc: {quantity: log.quantity}}).exec()
		]).then(function () {
			logger.logCancel(req.params.id);
			return res.send(true);
		}).catch(function () {
			if (err) return next(new CodedError(err, 400));
		});
	});
};

exports.loginAdmin = function (req, res, next) {

	let password = req.body.password;
	authController.SHA256(config.inventoryPassword).then((pass) => {
		if(password == pass){

			res.cookie('logged', true);
			Session.create({session: req.sessionID}).then((token) => {
				return res.send(true);
			}).catch((err)=>{
				return next(new CodedError(err, 500));
			});
		} else {
			return next(new CodedError('Wrong password', 403));
		}
	});
};