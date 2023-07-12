const joi = require('joi')

const addNewBoard = joi.object({
    boardTitle : joi.string().trim().required(),
})

module.exports= {
    addNewBoard
}