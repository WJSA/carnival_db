const { Router } = require("express")
const {
    getAllReserva,
    getReserva,
    createReserva,
    updateReserva,
//    deleteReserva,
} = require("../controllers/reserva.controllers")

const router = Router()

router.get('/reservas', getAllReserva);

router.get('/reservas/:id', getReserva);

router.post('/reservas', createReserva);

router.put('/reservas/:id', updateReserva);

//router.delete('/reservas/:id', deleteReserva);

module.exports = router;