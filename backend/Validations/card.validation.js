const joi = require('joi')

const addNewCard = joi.object({
    listID : joi.string().trim().required(),
    cardTitle : joi.string().trim().required(),
    cardDescription : joi.string().trim(),
})
const updateCard = joi.object({
    // cardID : joi.string().trim().required(),
    // cardTitle : joi.string().trim()
})

module.exports= {
    addNewCard,
    updateCard
}