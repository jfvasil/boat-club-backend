const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')



router.post('/login', authController.login)




router.post('/logout', authController.logout)

router.get('/register/:token', authController.signupAuth)

module.exports = router
