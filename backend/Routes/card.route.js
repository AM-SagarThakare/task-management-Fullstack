const express = require('express');
const { cardController } = require('../Controllers');
const router = express.Router();

router.post('/add-card',cardController.addNewCard)

module.exports = router;