const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const {
    getAllNews,
    getNewsByID,
    createNews,
    updateNews,
    deleteNews
} = require('../controllers/newsAndUpdatesController')


router.use(verifyJWT)

router.get('/', getAllNews)
router.get('/:id',getNewsByID)
router.post('/', createNews)
router.put('/:id', updateNews)
router.delete('/:id', deleteNews)

module.exports = router