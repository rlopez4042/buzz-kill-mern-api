const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/userController')

const {authenticate} = require('../middleware/authenticate')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', authenticate, getUser)

module.exports = router