const express = require('express');
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');

const {
	validators, validate,
} = require('./controllers/validators');

function selfUser(req, res, next) {
	req.params.userId = req.session.userId;
	next();
}

const authRouter = express.Router();

authRouter.get('/', authController.getServiceData);

const userRouter = express.Router();

userRouter.post('/login', validate(validators.login), authController.login);

// Endpoints that require authentication
userRouter.use(authController.authRequired);

userRouter.get('/self', selfUser, authController.getUser);
userRouter.post('/logout', authController.logout);

// Endpoints limited to administrators
userRouter.use(authController.adminRequired);

userRouter.get('/all', authController.getAllUsers);
userRouter.get('/:userId', authController.getUser);
userRouter.post('/:userId/addRole', validate(validators.addRole), authController.addRole);

const postRouter = express.Router();

postRouter.get('/published/all', postController.getPublishedPosts);
postRouter.get('/published/:postId', postController.getPublishedPost);

postRouter.use(authController.adminRequired);

postRouter.get('/all', postController.getPosts);
postRouter.get('/:postId', postController.getPost);
postRouter.post('/', validate(validators.post), postController.addPost);
postRouter.patch('/:postId', validate(validators.post), postController.updatePost);
postRouter.post('/:postId/publish', postController.publishPost);
postRouter.delete('/:postId', postController.removePost);

const router = express.Router();

router.use('/api/auth', authRouter);
router.use('/api/user', userRouter);
router.use('/api/post', postRouter);

module.exports = router;
