const express = require("express");
const router = express.Router();
const { boardController } = require("../Controllers");
const listRoutes = require("./list.route");
const { upload } = require("../Middlewares/uploadImage");
const multer = require("multer");

router.use("/list", listRoutes);

router.post("/add-board",upload.single('image'), boardController.addNewBoard);
router.get("/all-boards", boardController.getAllBoards);
router
  .route("/:boardID")
  .get(boardController.getBoardDetailsByID)
  .delete(boardController.deleteBoard)
  .patch(boardController.updateBoard);

module.exports = router;
