const { Router } = require("express")
const {
    getAllArtists,
    getArtist,
    createArtist,
    updateArtist,
//    deleteArtist,
} = require("../controllers/artista.controllers")

const router = Router()

router.get('/artistas', getAllArtists);

router.get('/artistas/:id', getArtist);

router.post('/artistas', createArtist);

router.put('/artistas/:id', updateArtist);

//router.delete('/artistas/:id', deleteArtist);

module.exports = router;