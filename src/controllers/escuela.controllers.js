const pool = require('../db')

const getAllSchools = async (req, res, next) => {
    try {
        const allSchools = await pool.query('SELECT * FROM cgj_escuela_de_samba')
        res.json(allSchools.rows)
    } catch(error) {
        next(error)
    }
}

const getSchool = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT * FROM cgj_escuela_de_samba WHERE idescuela = $1', [id])
    
        if (result.rows.length === 0) return res.status(404).json({
            message: 'Escuela no encontrada'
        })

        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const createSchool = async (req, res, next) => {
    const { idescuela, nombre, fechafundacion, direccion, resumenhistorico } = req.body

    try {
        const result =  await pool.query('INSERT INTO cgj_escuela_de_samba (idescuela, nombre, fechafundacion, direccion, resumenhistorico) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
            idescuela, 
            nombre, 
            fechafundacion, 
            direccion, 
            resumenhistorico
        ])
    
        res.json(result.rows[0])
    } catch(error) {
        next(error)
    }
}

const updateSchool = async (req, res, next) => {
    try {
        const { idescuela } = req.params;
        const { nombre, fechafundacion, direccion, resumenhistorico } = req.body;

        const result = await pool.query(
            "UPDATE cgj_escuela_de_samba SET nombre = $1, fechafundacion = $2, direccion = $3, resumenhistorico = $4 WHERE idescuela = $5 RETURNING *", [ 
                nombre, 
                fechafundacion, 
                direccion, 
                resumenhistorico,
                idescuela
            ]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Escuela no encontrada" });
  
        return res.json(result.rows[0]);
    } catch(error) {
        next(error);
    }
}

const deleteSchool = async (req, res, next) => {
    try {
        const { idescuela } = req.params;
        const result = await pool.query("DELETE FROM cgj_escuela_de_samba WHERE idescuela = $1 RETURNING * ", [idescuela]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Escuela no encontrada" });
        return res.sendStatus(204);
    } catch(error) {
        next(error);
    }
}

module.exports = {
    getAllSchools,
    getSchool,
    createSchool,
    updateSchool,
    deleteSchool,
}