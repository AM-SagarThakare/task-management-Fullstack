
const express = require('express');
const { boardController } = require('../Controllers');
const router = express.Router()

router.post('/add-board',boardController.addNewBoard)
router.get('/all-boards',boardController.getAllBoards)

module.exports = router;