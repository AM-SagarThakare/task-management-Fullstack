const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload");
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("bgImg");

module.exports = { upload };
