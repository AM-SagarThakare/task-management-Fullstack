const { validate } = require("../Middlewares");
const { boardCollection } = require("../Models");
const { boardService } = require("../Services");
const { boardValidation } = require("../Validations");

const addNewBoard = async (req, res) => {
  const { error, value } = validate.validateJoiSchema(
    boardValidation.addNewBoard
  )(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  const newBoard = new boardCollection({
    ...value,
    boardOwnerID: req.user_id,
  });

  newBoard
    .save()
    .then(() => {
      return res
        .status(201)
        .send({ message: "Board added Successfully", success: true });
    })
    .catch((error) => console.log(error));
};

const getAllBoards = async (req, res) => {
  return res.status(200).send(await boardService.getAllBoards(req.user_id));
};

const getBoardDetailsByID = async (req, res) => {
  console.log("BOARD CONTROLLER");
  try {
    return res
      .status(200)
      .send(await boardService.getBoardDetailsByID(req.params.boardID));
  } catch (err) {
    console.log(err.message);
  }
};

const updateBoard = async (req, res) => {
  const { error, value } = validate.validateJoiSchema(
    boardValidation.updateBoard
  )(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  return res.status(200).send(await boardService.updateBoard(value));
};

const deleteBoard = async (req, res) => {
  return res
    .status(200)
    .send(await boardService.deleteBoard(req.params.boardID));
};

module.exports = {
  addNewBoard,
  getAllBoards,
  getBoardDetailsByID,
  updateBoard,
  deleteBoard,
};
