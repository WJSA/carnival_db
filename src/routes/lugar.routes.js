const { Router } = require("express")
const { 
    getAllPlaces,
    getPlaces,
    createPlaces,
    updatePlaces,
    deletePlaces,
} = require('../controllers/lugar.controllers')

const router = Router()

router.get('/lugares', getAllPlaces);

router.get('/lugares/:id', getPlaces);

router.post('/lugares', createPlaces);

router.put('/lugares/:id', updatePlaces);

router.delete('/lugares/:id', deletePlaces);

module.exports = router