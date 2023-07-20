const { validate } = require("../Middlewares");
const { cardCollection, listCollection } = require("../Models");
const { listService } = require("../Services");
const { cardValidation } = require("../Validations");

const addNewCard = async (req, res) => {
  const { error, value } = validate.validateJoiSchema(
    cardValidation.addNewCard
  )(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  const newCard = new cardCollection({
    ...value,
    listID: req.body.listID,
  });

  newCard
    .save()
    .then(async (response) => {
      await listService.addCardID(response);

      return res
        .status(201)
        .send({ message: "card added Successfully", success: true });
    })
    .catch((error) => console.log(error));
};

module.exports = {
  addNewCard,
};
