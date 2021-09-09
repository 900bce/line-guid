const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/get-line-game-guid', controller.getLineGameGuid);

module.exports = router;
