

const express = require('express');
const { verifyToken } = require('../Middlewares/verifyToken');
const boardRoutes = require('./board.route')
const app = express();
const router = express.Router();

router.all('*',verifyToken)

router.get('/', function(req, res) {
    res.send('Welcome in user get')
})

router.use('/board',boardRoutes)

module.exports = router;