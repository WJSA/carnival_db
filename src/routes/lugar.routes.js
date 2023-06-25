const { Router } = require("express")
const { getAllPlaces } = require('../controllers/lugar.controllers')

const router = Router()

router.get('/lugares', getAllPlaces);

module.exports = router