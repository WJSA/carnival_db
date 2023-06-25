const { Router } = require("express")
const {
    getAllEnterprice,
    getEnterprice,
    createEnterprice,
    updateEnterprice,
//    deleteEnterprice,
} = require("../controllers/empresa.controllers")

const router = Router()

router.get('/empresas', getAllEnterprice);

router.get('/empresas/:id', getEnterprice);

router.post('/empresas', createEnterprice);

router.put('/empresas/:id', updateEnterprice);

//router.delete('/empresas/:id', deleteEnterprice);

module.exports = router;