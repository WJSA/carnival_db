const { Router } = require("express")
const {
    getAllSchools,
    getSchool,
    createSchool,
    updateSchool,
    deleteSchool,
} = require("../controllers/escuela.controllers")

const router = Router()

router.get('/escuelas', getAllSchools);

router.get('/escuelas/:id', getSchool);

router.post('/escuelas', createSchool);

router.put('/escuelas/:id', updateSchool);

router.delete('/escuelas/:id', deleteSchool);

module.exports = router;