
const express = require('express');
const { boardController } = require('../Controllers');
const router = express.Router()

router.route('/').patch(boardController.updateBoard)
router.post('/add-board',boardController.addNewBoard)
router.get('/all-boards',boardController.getAllBoards)
router.route('/:boardID').get(boardController.getBoardDetailsByID).delete(boardController.deleteBoard)

module.exports = router;