const joi = require("joi");

const addNewList = joi.object({
  listTitle: joi.string().trim().required(),
  boardID: joi.string().trim().required(),
  card: joi.array().items(joi.string().required()),
});

module.exports= {
    addNewList
}
