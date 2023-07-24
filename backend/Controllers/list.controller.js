const { validate } = require("../Middlewares");
const { listCollection } = require("../Models");
const { boardService, listService } = require("../Services");
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

const deleteListdByID = async (req, res) => {
  try {
    return res.send(await listService.deleteListByID(req.params.listID));
  } catch (err) {
    console.log(err);
  }
};

const updateListByID = async (req, res) => {
  try {
    res.status(200).send(await listService.updateListByID(req.params.listID, req.body));
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  addNewList,
  deleteListdByID,
  updateListByID,
};
