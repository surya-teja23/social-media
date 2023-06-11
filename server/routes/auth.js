const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");

router.post("/register" , upload.single("profile") , registerController);
router.post("/login" , loginController);

module.exports = router;
