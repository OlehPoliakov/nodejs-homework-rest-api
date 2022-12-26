const express = require('express');

const ctrl = require('../../controllers/auth');

const { ctrlWrapper } = require('../../helpers');

const { validateBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

router.post('/verify/',  validateBody(schemas.emailSchema), ctrlWrapper(ctrl.resendEmail));

// signin
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));
// updateUsers
router.patch('/users', authenticate, validateBody(schemas.updateUserSchema), ctrlWrapper(ctrl.updateUsers));

router.patch('/avatars', authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
