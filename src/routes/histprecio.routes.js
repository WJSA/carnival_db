const { Router } = require("express")
const {
    getAllHistPrecio,
    getHistPrecio,
    createHistPrecio,
    updateHistPrecio,
//    deleteHistPrecio,
} = require("../controllers/histprecio.controllers")

const router = Router()

router.get('/histprecio', getAllHistPrecio);

router.get('/histprecio/:id', getHistPrecio);

router.post('/histprecio', createHistPrecio);

router.put('/histprecio/:id', updateHistPrecio);

//router.delete('/histprecio/:id', deleteHistPrecio);

module.exports = router;