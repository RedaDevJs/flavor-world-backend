const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const { validateToken } = require('../MiddleWares/tokenValidation')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/profile', validateToken, userController.profile)

module.exports = router
