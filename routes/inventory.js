const express = require('express'),
    authController = require('../controllers/authController.js'),
    inventoryController = require('../controllers/inventoryController.js'),
    multer = require('multer'),
    upload = multer({ dest: './uploaded/' });

let router = express.Router();

router.use(authController.auth);
router.use(authController.authRole('ieee'));
router.route('/item/:id').get(inventoryController.getItem);
router.route('/items').get(inventoryController.getItems);
router.route('/buy').post(inventoryController.buyItem);
router.use(authController.authRole('admin'));
router.route('/item').post(inventoryController.saveItem);

module.exports = router;