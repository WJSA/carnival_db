const { Router } = require("express")
const {
    getAllClient,
    getClient,
    createClient,
    updateClient,
//    deleteClient,
} = require("../controllers/cliente.controllers")

const router = Router()

router.get('/clientes', getAllClient);

router.get('/clientes/:id', getClient);

router.post('/clientes', createClient);

router.put('/clientes/:id', updateClient);

//router.delete('/clientes/:id', deleteClient);

module.exports = router;