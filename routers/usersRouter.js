const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// router.get('/', usersController)

module.exports = router