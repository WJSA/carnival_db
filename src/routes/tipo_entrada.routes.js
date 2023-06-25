const { Router } = require("express")

const {
    getAllTypes_tickets,
    getType_ticket,
    createType_ticket,
    updateType_ticket,
    //deleteType_ticket,
} = require("../controllers/tipo_entrada.controllers")

const router = Router()

router.get('/tipo_entrada', getAllTypes_tickets);

router.get('/tipo_entrada/:id', getType_ticket);

router.post('/tipo_entrada', createType_ticket);

router.put('/tipo_entrada/:id', updateType_ticket);

//router.delete('/tipo_entrada/:id', deleteType_ticket);

module.exports = router;
