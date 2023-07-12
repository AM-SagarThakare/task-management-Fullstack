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
    BoardOwnerID : req.user_id
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

const getAllBoards = async (req,res)=>{
    
   return boardService.getAllBoards(req.user_id)
}

module.exports = {
  addNewBoard,
  getAllBoards
};
