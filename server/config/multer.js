const multer = require("multer");

//File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.fieldname === 'profile')
      cb(null, "./public/profile");
    else
      cb(null, "./public/posts");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    req.body.picturePath = fileName
    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
