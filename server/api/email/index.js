
const express = require('express');
const controller = require('./email.controller');

const router = express.Router();

router.get('/click', controller.click);
router.get('/open.gif', controller.open);

module.exports = router;
