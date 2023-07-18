const express = require('express');
const { listController } = require('../Controllers');
const router = express.Router()

router.post('/add-list',listController.addNewList)

module.exports = router;