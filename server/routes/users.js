const express = require('express')
const verifyJWT = require('../middleware/verifyJWT.js')
const {
  getUser , getUserFriends ,
  addRemoveFriend
} = require('../controllers/userController.js')

const router = express.Router() 

router.use(verifyJWT)

router.get('/:id' , getUser)
router.get('/:id/friends' , getUserFriends)

router.patch('/:id/:friendId' , addRemoveFriend)

module.exports = router