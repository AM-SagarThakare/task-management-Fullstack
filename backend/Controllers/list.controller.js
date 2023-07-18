const { validate } = require("../Middlewares");
const { listCollection, boardCollection } = require("../Models");
const { boardService } = require("../Services");
const { listValidation } = require("../Validations");

const addNewList = async (req, res) => {
  const { error, value } = validate.validateJoiSchema(
    listValidation.addNewList
  )(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  }
  const newList = new listCollection({
    ...value,
  });

  newList
    .save()
    .then(async (response) => {
      // console.log(response);

      await boardService.addListID({
        boardID: response.boardID,
        listID: response._id,
      });

      return res
        .status(201)
        .send({ message: "List added Successfully", success: true });
    })
    .catch((error) => res.send(error.message));
};

module.exports = {
  addNewList,
};
