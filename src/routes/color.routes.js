const { Router } = require("express")

const {
    getAllColors,
    getColor,
    createColor,
    updateColor,
//  deleteColor,
} = require("../controllers/color.controllers")

const router = Router()

router.get('/colores', getAllColors);

router.get('/colores/:id', getColor);

router.post('/colores', createColor);

router.put('/colores/:id', updateColor);

//router.delete('/colores/:id', deleteColor);

module.exports = router;

