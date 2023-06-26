const { Router } = require("express")
const {
    getAllCarnivals,
    getCarnival,
    createCarnival,
    updateCarnival,
  //  deleteCarnival,
} = require("../controllers/carnavalanual.controllers")

const router = Router()

router.get('/carnavales', getAllCarnivals);

router.get('/carnavales/:id', getCarnival);

router.post('/carnavales', createCarnival);

router.put('/carnavales/:id', updateCarnival);

//router.delete('/carnavales/:id', deleteCarnival);

module.exports = router;