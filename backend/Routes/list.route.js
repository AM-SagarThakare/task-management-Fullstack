const express = require("express");
const { listController } = require("../Controllers");
const router = express.Router();
const cardRoutes = require("../Routes/card.route");

router.use("/card", cardRoutes);

router
  .route("/:listID")
  .delete(listController.deleteListdByID)
  .patch(listController.updateListByID);
router.post("/add-list", listController.addNewList);

module.exports = router;
