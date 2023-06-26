const { Router } = require("express")
const {
    getAllHistGrupo,
    getHistGrupo1,
    getHistGrupo2,
    createHistGrupo,
    updateHistGrupo,
//    deleteEnterprice,
} = require("../controllers/histgrupo.controllers")

const router = Router()

router.get('/histgrupo', getAllHistGrupo);

router.get('/histgrupo/:id/:fecha', getHistGrupo1);

router.get('/histgrupo/:id', getHistGrupo2);

router.post('/histgrupo', createHistGrupo);

router.put('/histgrupo/:id', updateHistGrupo);

//router.delete('/empresas/:id', deleteEnterprice);

module.exports = router;