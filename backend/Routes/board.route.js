const express = require("express");
const router = express.Router();
const { boardController } = require("../Controllers");
const listRoutes = require("./list.route");
// const { upload } = require("../Middlewares/uploadImage");
const multer = require("multer");

router.use("/list", listRoutes);

// router.route('/').patch(boardController.updateBoard)

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file);
      cb(null, "upload/");
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, `${Date.now()}${file.originalname}`);
    },
  }),
});

router.post("/add-board",upload.single('image'), boardController.addNewBoard);
router.get("/all-boards", boardController.getAllBoards);
router
  .route("/:boardID")
  .get(boardController.getBoardDetailsByID)
  .delete(boardController.deleteBoard)
  .patch(boardController.updateBoard);

module.exports = router;
