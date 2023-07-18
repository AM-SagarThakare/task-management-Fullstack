
const express = require('express');
const router = express.Router()
const { boardController } = require('../Controllers');
const listRoutes = require('./list.route')

router.use('/list',listRoutes)

router.route('/').patch(boardController.updateBoard)

router.post('/add-board',boardController.addNewBoard)
router.get('/all-boards',boardController.getAllBoards)
router.route('/:boardID').get(boardController.getBoardDetailsByID).delete(boardController.deleteBoard)


module.exports = router;