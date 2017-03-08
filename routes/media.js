const express = require('express'),
    authController = require('../controllers/authController.js'),
	mediaController = require('../controllers/mediaController.js'),
	multer = require('multer');

let router = express.Router();


router.route('/').get(mediaController.getMedia);

router.use(authController.auth);
router.use(authController.authRole('ieee'));

router.route('/').post(mediaController.uploadMedia);

router.use(authController.authRole('admin'));

router.route('/remove/:id').post(mediaController.removeMedia);




module.exports = router;