const express = require('express'),
    authController = require('../controllers/authController.js'),
    inventoryController = require('../controllers/inventoryController.js'),
    multer = require('multer'),
    upload = multer({ dest: './uploaded/' });

let router = express.Router();

//router.use(authController.auth);
//router.use(authController.authRole('ieee'));
router.route('/items').get(inventoryController.getItems);


module.exports = router;