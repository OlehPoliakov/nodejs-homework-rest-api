const express = require('express');

const { ctrlWrapper } = require('../../helpers');

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contacts');

const router = express.Router();

// signup
router.post('./register');

module.exports = router;
