const express = require('express')
const router = express.Router()

const {sendCode, resetPassword} = require('../controllers/recoveryController')

router.post('/code', sendCode)

router.post('/reset', resetPassword)


module.exports = router