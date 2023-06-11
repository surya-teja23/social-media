const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const verifyJWT = require("../middleware/verifyJWT");
const { getFeedPosts, getUserPosts, likePost, createPost } = require('../controllers/postsController')

router.use(verifyJWT)

router.get('/', getFeedPosts)
router.post("/", upload.single("posts"), createPost);
router.get('/:userId', getUserPosts)
router.patch('/:id/like', likePost)


module.exports = router;
