const { Router } = require("express")
const {
    getAllPlaceEvents,
    getPlaceEvent,
    createPlaceEvent,
    updatePlaceEvent,
    //deletePlaceEvent,
} = require("../controllers/lugarevento.controllers")

const router = Router()

router.get('/lugareventos', getAllPlaceEvents);

router.get('/lugareventos/:id', getPlaceEvent);

router.post('/lugareventos', createPlaceEvent);

router.put('/lugareventos/:id', updatePlaceEvent);

//router.delete('/lugareventos/:id', deletePlaceEvent);

module.exports = router;