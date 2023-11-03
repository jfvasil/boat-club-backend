const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const {
    getAllRecaps,
    getRecapByID,
    createRecap,
    updateRecap,
    deleteRecap
} = require('../controllers/meetingRecapsController')

router.use(verifyJWT)

router.get('/', getAllRecaps)
router.get('/:id',getRecapByID)
router.post('/', createRecap)
router.put('/:id', updateRecap)
router.delete('/:id', deleteRecap)

module.exports = router