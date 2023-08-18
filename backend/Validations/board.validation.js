const joi = require("joi");

const addNewBoard = joi.object({
  boardTitle: joi.string().trim().required(),
});
const updateBoard = joi.object({
  boardID: joi.string().trim().required(),
  boardTitle: joi.string().trim(),
  list: joi.array().items(joi.string().required()),
 
});

module.exports = {
  addNewBoard,
  updateBoard,
};
